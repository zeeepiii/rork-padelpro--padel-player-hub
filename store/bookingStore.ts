import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Booking {
  id: string;
  clubId: string;
  date: string;
  time: string;
  duration: number;
  court: number;
  players: string[];
}

interface BookingState {
  bookings: Booking[];
  selectedDay: number;
  selectedTime: string | null;
  actions: {
    addBooking: (booking: Booking) => void;
    cancelBooking: (bookingId: string) => void;
    setSelectedDay: (day: number) => void;
    setSelectedTime: (time: string | null) => void;
  };
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      selectedDay: new Date().getDate(),
      selectedTime: null,
      actions: {
        addBooking: (booking) => {
          const { bookings } = get();
          set({ bookings: [...bookings, booking] });
        },
        cancelBooking: (bookingId) => {
          const { bookings } = get();
          set({ bookings: bookings.filter(booking => booking.id !== bookingId) });
        },
        setSelectedDay: (day) => set({ selectedDay: day }),
        setSelectedTime: (time) => set({ selectedTime: time }),
      },
    }),
    {
      name: 'playatomic-booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);