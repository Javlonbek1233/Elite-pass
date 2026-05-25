export interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string; // e.g., "September 24, 2026"
  time: string; // e.g., "18:00 - 02:00"
  description: string;
  longDescription: string;
  location: string;
  venueName: string;
  basePrice: number;
  category: 'Music' | 'Gala' | 'Exhibition' | 'All';
  image: string;
  countdownTarget: string; // "2026-09-24T18:00:00" or similar
  totalTickets: number;
  remainingTickets: number;
  highlights: string[];
  stages?: string[];
}

export interface TicketTier {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
  color: string; // Tailwind tint/accent color representation
  remaining: number;
  total: number;
  badge?: string;
}

export interface CartItem {
  id: string; // Unique ID for this specific ticket choice (eventId + "_" + tierId + optionsHash)
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventImage: string;
  tierId: string;
  tierName: string;
  quantity: number;
  basePrice: number;
  options: {
    customLanyard: boolean;
    digitalAccessPass: boolean;
    valetParking: boolean;
  };
  totalPrice: number;
}

export interface TimelineItem {
  time: string;
  title: string;
  artist: string;
  stage: string;
  description: string;
}

export interface EventTimeline {
  dayName: string;
  date: string;
  schedule: TimelineItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Concert' | 'Exhibition' | 'Festival' | 'VIP';
  image: string;
  details: string;
}
