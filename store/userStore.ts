import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '@/constants/mockData';

interface UserState {
  user: {
    id: string;
    name: string;
    avatar: string;
    level: number;
    matches: number;
    wins: number;
    losses: number;
  } | null;
  isLocationEnabled: boolean;
  favoriteClubs: string[];
  actions: {
    setUser: (user: UserState['user']) => void;
    enableLocation: () => void;
    toggleFavoriteClub: (clubId: string) => void;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: USER, // Mock user data
      isLocationEnabled: false,
      favoriteClubs: [],
      actions: {
        setUser: (user) => set({ user }),
        enableLocation: () => set({ isLocationEnabled: true }),
        toggleFavoriteClub: (clubId) => {
          const { favoriteClubs } = get();
          if (favoriteClubs.includes(clubId)) {
            set({ favoriteClubs: favoriteClubs.filter(id => id !== clubId) });
          } else {
            set({ favoriteClubs: [...favoriteClubs, clubId] });
          }
        },
      },
    }),
    {
      name: 'playatomic-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);