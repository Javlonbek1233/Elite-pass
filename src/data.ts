import { Event, TicketTier, EventTimeline, GalleryItem } from './types';

export const EVENTS: Event[] = [
  {
    id: 'cybercore-2026',
    title: 'Neo-Tokyo Chronos Symphony',
    subtitle: 'Cyberpunk Audiovisual Rave Festival',
    date: 'September 24, 2026',
    time: '18:00 - 04:00',
    description: 'Immerse yourself in a high-octane celebration of synthwave rhythms, hyper-neon laser architecture, and boundary-pushing futuristic soundscapes.',
    longDescription: 'Chronos Symphony is the pinnacle of electronic and digital culture convergence. Featuring twenty world-class electronic artists across three interactive holographic stages, the festival integrates live brainwave-visual synesthesias, reactive laser grids, and an atmosphere built entirely on luxury future cyberpunk and neon aesthetics. Located at the heart of Tokyo Metropolitan Dome, this is a premium acoustic and visual experience.',
    location: 'Shinjuku Dome, Tokyo, Japan',
    venueName: 'Tokyo Arena Grid-7',
    basePrice: 149,
    category: 'Music',
    image: '/src/assets/images/cyberpunk_festival_1779694188604.png',
    countdownTarget: '2026-09-24T18:00:00',
    totalTickets: 12000,
    remainingTickets: 3142,
    highlights: [
      'Interactive holographic projection domes',
      'Wearable LED bands synchronized to live audio',
      'Ultra-bass spatial acoustic arrays',
      'Exclusive futuristic street food courts'
    ],
    stages: ['Holo-Dome Alpha', 'The Synthesis Ring', 'Neon Alley Underground']
  },
  {
    id: 'aurelia-gala',
    title: 'Aurelia Golden Orchestra Gala',
    subtitle: 'Grand Symphonic Orchestration & Piano masterclass',
    date: 'October 18, 2026',
    time: '19:30 - 23:00',
    description: 'A prestigious night of classical triumphs, featuring a legendary concerto lineup, champagne reception, and unmatched architectural acoustics.',
    longDescription: 'Under the guidance of Maestro Eugene Von Hapsburg, the Aurelia Grand Symphony Orchestra presents an enchanting evening featuring works of Chopin, Rachmaninoff, and modern neoclassicists. Accompanied by a stunning acoustic projection hall illuminated by 10,000 candles, this black-tie gala merges royal old-world luxury with modern architectural precision.',
    location: 'Royal Symphony Hall, Vienna, Austria',
    venueName: 'Aurelia Classical Sanctuary',
    basePrice: 249,
    category: 'Gala',
    image: '/src/assets/images/gala_concert_1779694211092.png',
    countdownTarget: '2026-10-18T19:30:00',
    totalTickets: 1800,
    remainingTickets: 124,
    highlights: [
      'Pre-concert select champagne and caviar reception',
      '10,000 live beeswax candle acoustic illumination',
      'Exclusive masterclass with award-winning concert pianists',
      'Commemorative luxury program book and custom gold pin'
    ],
    stages: ['Grand Royal Amphitheatre', 'Chamber of Rosin']
  },
  {
    id: 'lumina-biennale',
    title: 'Lumina Digital Art Biennale',
    subtitle: 'Avant-garde Cybernetic Art & High-Fashion Showcase',
    date: 'November 05, 2026',
    time: '10:00 - 22:00',
    description: 'Witness the future of creative expression, featuring interactive AI sculptures, VR visual gardens, and high-fashion robotic exhibits.',
    longDescription: 'Lumina Biennale is a globally curated exhibition that collapses the wall between raw mathematics, cybernetics, visual design, and haute couture. Visitors walk through immersive micro-ecosystems where digital plants grow in response to voice pitch, and wearable smart-garments flow dynamically in response to ambient solar radiation. It is a premium multi-sensory artistic lounge.',
    location: 'Metropolitan Art Center, Paris, France',
    venueName: 'Pavilion Lumineux - Hall 4',
    basePrice: 89,
    category: 'Exhibition',
    image: '/src/assets/images/art_exhibition_1779694238373.png',
    countdownTarget: '2026-11-05T10:00:00',
    totalTickets: 5000,
    remainingTickets: 1898,
    highlights: [
      'AI-driven generative art interactive galleries',
      'VR kinetic sculpturing interactive headsets',
      'Exclusive runway presentation of smart fiber textiles',
      'Artist-led guided champagne tours'
    ],
    stages: ['Main Curated Gallery', 'Lumina VR Hub', 'Haute Couture Pavilion']
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'tier-general',
    name: 'General Access Pass',
    description: 'Full entrance privileges, standard seating grid, access to public sensory lounges, and complimentary eco-bottle.',
    price: 0, // Calculated as Event BasePrice
    benefits: [
      'Standard admission access',
      'All public stages & food pavilions',
      'Interactive event app integration',
      'Standard digital ticket certificate'
    ],
    color: 'emerald',
    remaining: 450,
    total: 1000
  },
  {
    id: 'tier-vip',
    name: 'VIP Imperial Lounge',
    description: 'Elevated premium viewing platforms, dedicated express check-in, complimentary luxury catering bar, and velvet private rooms.',
    price: 150, // Event BasePrice + 150
    benefits: [
      'Priority fast-track VIP check-in lines',
      'Elevated VIP lounge with front-row premium sights',
      'Complimentary top-tier catering & mixology bar',
      'Exclusive premium leather event lanyard',
      'Private luxury restrooms'
    ],
    color: 'amber',
    remaining: 85,
    total: 200,
    badge: 'Highly Popular'
  },
  {
    id: 'tier-elite',
    name: 'Royal Backstage & Artist Access',
    description: 'The definitive luxury ticket. Backstage dressing lounge access, personalized escort, private dining, pre-show Meet & Greet, and custom merchandise.',
    price: 450, // Event BasePrice + 450
    benefits: [
      'All VIP Lounge privileges included',
      'Private backstage meet & greet with designated artists',
      'Elite pre-show fine dining experience',
      'Premium custom framed physical event certificate',
      'Post-festival personal chauffeur service within 20km',
      'Signed limited-edition archival vinyl/sculpture program'
    ],
    color: 'rose',
    remaining: 12,
    total: 25,
    badge: 'Ultra Premium'
  }
];

export const TIMELINE_DATA: Record<string, EventTimeline[]> = {
  'cybercore-2026': [
    {
      dayName: 'Day 1: Pre-Launch',
      date: 'Sept 24, 2026',
      schedule: [
        {
          time: '18:00 - 19:30',
          title: 'Opening Ceremony: Digital Zenith',
          artist: 'Orion Synapse',
          stage: 'Holo-Dome Alpha',
          description: 'A holographic ambient performance mapping the city’s data waves into fluid glowing light streams.'
        },
        {
          time: '19:30 - 21:00',
          title: 'Sub-Zero Beats',
          artist: 'Glitch Empress',
          stage: 'Neon Alley Underground',
          description: 'Heavy bass structures paired with live digital synth improvisations under thermal-tracking cameras.'
        },
        {
          time: '21:00 - 00:00',
          title: 'Hyper-Neon Nocturne',
          artist: 'Code:RED & Laser-Eye',
          stage: 'The Synthesis Ring',
          description: 'Interactive audio battle where crowd movement controls the pitch bending of massive sub-bass synths.'
        },
        {
          time: '00:00 - 04:00',
          title: 'Chronos Peak Set',
          artist: 'Vektor Mind',
          stage: 'Holo-Dome Alpha',
          description: 'An elite 4-hour musical journey with hyper-lasers, fire-generators, and deep cerebral retro-electro.'
        }
      ]
    },
    {
      dayName: 'Day 2: Peak Synthesis',
      date: 'Sept 25, 2026',
      schedule: [
        {
          time: '15:00 - 17:00',
          title: 'Algorithmic Soundscapes Workshop',
          artist: 'Dr. Evelyn Moss',
          stage: 'The Synthesis Ring',
          description: 'A curated masterclass detailing custom AI audio mapping models.'
        },
        {
          time: '17:30 - 20:00',
          title: 'Ambient Deep Echoes',
          artist: 'Nebula Lounge',
          stage: 'Neon Alley Underground',
          description: 'Quiet, spatialized synthesizer waves designed for micro-mindfulness and deep posture alignment.'
        },
        {
          time: '20:30 - 03:00',
          title: 'The Great Convergence Finale',
          artist: 'Alchemist of Light',
          stage: 'Holo-Dome Alpha',
          description: 'A synchronized showcase combining 4D tactile sound structures, holographic avatars, and active laser meshes.'
        }
      ]
    }
  ],
  'aurelia-gala': [
    {
      dayName: 'Gala Night Sequence',
      date: 'Oct 18, 2026',
      schedule: [
        {
          time: '19:30 - 20:15',
          title: 'Imperial Champagne Reception',
          artist: 'Symphony Quartet Guild',
          stage: 'Aurelia Classical Sanctuary',
          description: 'Elite greeting with vintage champagnes, warm caviar servings, and private live violin string-ensemble.'
        },
        {
          time: '20:30 - 21:45',
          title: 'Concerto No.2 in C Minor',
          artist: 'Clara Del Sol & Orchestral Guild',
          stage: 'Grand Royal Amphitheatre',
          description: 'A passionate world-class performance of Rachmaninoff’s legendary piano concerto under 10,000 candles.'
        },
        {
          time: '22:00 - 23:00',
          title: 'Avant-garde Neoclassical Improv',
          artist: 'Ludovico Echoes',
          stage: 'Grand Royal Amphitheatre',
          description: 'Intimate ambient grand piano session reflecting modern European electronic and raw classical fusion.'
        }
      ]
    }
  ],
  'lumina-biennale': [
    {
      dayName: 'Exhibition Master Schedule',
      date: 'Nov 05, 2026',
      schedule: [
        {
          time: '10:00 - 12:30',
          title: 'Grand Curator Opening Tour',
          artist: 'Curator Beatrice Moreau',
          stage: 'Main Curated Gallery',
          description: 'Step-by-step physical walkthrough explaining the computational roots of interactive AI installations.'
        },
        {
          time: '13:00 - 16:30',
          title: 'Virtual VR Kinetic Gardens',
          artist: 'Lumina Lab Collective',
          stage: 'Lumina VR Hub',
          description: 'Direct interactive sessions donning luxury lightweight VR haptic helmets to paint sound into space.'
        },
        {
          time: '18:00 - 20:30',
          title: 'Haute Couture Cybernetic Runway',
          artist: 'Atelier Smart-Garment',
          stage: 'Haute Couture Pavilion',
          description: 'A spectacular fashion showcase where intelligent garments change color based on light and crowd heart rate.'
        },
        {
          time: '21:00 - 22:00',
          title: 'Closing Discussion: Mathematics as Art',
          artist: 'Panel of Digital Thinkers',
          stage: 'Main Curated Gallery',
          description: 'A round-table discussion outlining the next decade of organic art and robotics symbiosis.'
        }
      ]
    }
  ]
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Holographic Stage Calibration',
    category: 'Festival',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    details: 'Calibrating the 48-million voxel floating light panels at Cybercore 2026 Venue.'
  },
  {
    id: 'g-2',
    title: 'Royal Violin Chamber',
    category: 'VIP',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    details: 'Exclusive rehearsal session in Vienna before VIP doors open.'
  },
  {
    id: 'g-3',
    title: 'Kinetic Plant Exhibit',
    category: 'Exhibition',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    details: 'Digital organic structures reacting live to physical human proximity.'
  },
  {
    id: 'g-4',
    title: 'Symphony Candle Setup',
    category: 'Concert',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    details: 'Precision placement of 10,000 beeswax candles for unparalleled warmth.'
  },
  {
    id: 'g-5',
    title: 'Synth Control Grid',
    category: 'Festival',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    details: 'Custom modular synthesizer layout used by Orion Synapse during Neon sessions.'
  },
  {
    id: 'g-6',
    title: 'Exclusive Backstage Lounge',
    category: 'VIP',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    details: 'Luxury seating zone provided for Elite ticket buyers at Paris Grand Halle.'
  }
];
