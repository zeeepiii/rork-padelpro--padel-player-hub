export const USER = {
  id: "1",
  name: "Alex",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  level: 3.5,
  matches: 24,
  wins: 16,
  losses: 8,
};

export const CLUBS = [
  {
    id: "1",
    name: "Indie Pádel Club",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    address: "Avenida de la Democracia 11, Madrid",
    distance: "1053km",
    city: "Madrid",
    rating: 4.8,
    courts: 6,
    favorite: false,
  },
  {
    id: "2",
    name: "Urban Padel Center",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    address: "Calle Gran Vía 28, Barcelona",
    distance: "12km",
    city: "Barcelona",
    rating: 4.6,
    courts: 8,
    favorite: true,
  },
  {
    id: "3",
    name: "Padel Pro Academy",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    address: "Paseo de la Castellana 89, Madrid",
    distance: "1050km",
    city: "Madrid",
    rating: 4.9,
    courts: 10,
    favorite: false,
  },
];

export const COACHES = [
  {
    id: "1",
    name: "Carlos Rodriguez",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    experience: "8 years",
    rating: 4.9,
    specialties: ["Technique", "Strategy", "Beginners"],
    price: 45,
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    experience: "6 years",
    rating: 4.7,
    specialties: ["Advanced Players", "Competition", "Fitness"],
    price: 50,
  },
  {
    id: "3",
    name: "Juan Martín",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    experience: "10 years",
    rating: 4.8,
    specialties: ["Professional Training", "Mental Coaching", "Technique"],
    price: 55,
  },
];

export const MATCHES = [
  {
    id: "1",
    club: "Indie Pádel Club",
    date: "2025-07-15",
    time: "18:00",
    duration: 90,
    players: [
      { id: "1", name: "Alex", level: 3.5 },
      { id: "2", name: "Sofia", level: 3.2 },
      { id: "3", name: "Marco", level: 3.6 },
      { id: "4", name: "Elena", level: 3.4 },
    ],
    level: "Intermediate",
    court: 3,
    status: "open",
  },
  {
    id: "2",
    club: "Urban Padel Center",
    date: "2025-07-16",
    time: "19:30",
    duration: 90,
    players: [
      { id: "1", name: "Alex", level: 3.5 },
      { id: "5", name: "Carlos", level: 3.7 },
      { id: "6", name: "Lucia", level: 3.8 },
      { id: "7", name: "Pablo", level: 3.6 },
    ],
    level: "Intermediate-Advanced",
    court: 5,
    status: "confirmed",
  },
];

export const TIME_SLOTS = [
  "16:00", "16:30", "17:00", "17:30", "18:00", 
  "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30"
];

export const DAYS_OF_WEEK = [
  { short: "SAM.", day: 12, month: "Juil." },
  { short: "DIM.", day: 13, month: "Juil." },
  { short: "LUN.", day: 14, month: "Juil." },
  { short: "MAR.", day: 15, month: "Juil." },
  { short: "MER.", day: 16, month: "Juil." },
  { short: "JEU.", day: 17, month: "Juil." },
  { short: "VEN.", day: 18, month: "Juil." },
];