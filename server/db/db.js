import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data.json');

const INITIAL_DATA = {
  locations: [
    {
      id: 'loc-1',
      name: 'Jubilee Hills Flagship',
      address: 'Plot no. 265/A, Road Number 10, Jubilee Hills, Hyderabad',
      city: 'Hyderabad, Telangana 500033',
      phone: '7373734634',
      hours: '12:00 PM – 12:30 AM (Daily)',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=85&auto=format&fit=crop',
      description: 'Our flagship Dreams Kitchen courtyard sanctuary featuring outdoor cabanas, warm starlight chandeliers, live sitar sessions, and bespoke private dining suites.',
      capacity: '180 Guests',
      features: ['Courtyard Seating', 'Private VIP Suite', 'Live Music', 'Valet Parking', 'Craft Bar']
    },
    {
      id: 'loc-2',
      name: 'Gachibowli Tech Hub',
      address: 'Level 3, Signature Towers, Opposite Bio Diversity Park, Gachibowli, Hyderabad',
      city: 'Hyderabad, Telangana 500032',
      phone: '7373734635',
      hours: '12:00 PM – 12:30 AM (Daily)',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=85&auto=format&fit=crop',
      description: 'Contemporary rooftop dining experience combining panoramic city skyline views with Dreams Kitchen mixology.',
      capacity: '220 Guests',
      features: ['Rooftop Deck', 'Panoramic Views', 'Executive Lounge', 'Cocktail Bar']
    },
    {
      id: 'loc-3',
      name: 'Financial District',
      address: 'Financial District Rd, Nanakramguda, Gachibowli, Hyderabad',
      city: 'Hyderabad, Telangana 500032',
      phone: '7373734636',
      hours: '12:00 PM – 12:00 AM (Daily)',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=85&auto=format&fit=crop',
      description: 'Sophisticated corporate fine dining space featuring intimate leather booth seating, wine sommelier service, and business lunch specials.',
      capacity: '150 Guests',
      features: ['Wine Cellar', 'Private Business Rooms', 'Sommelier Service', 'Valet']
    },
    {
      id: 'loc-4',
      name: 'Hitech City Boulevard',
      address: 'Near Cyber Towers, Hitech City Main Rd, Madhapur, Hyderabad',
      city: 'Hyderabad, Telangana 500081',
      phone: '7373734637',
      hours: '12:00 PM – 01:00 AM (Fri-Sun)',
      /* Updated luxury restaurant lounge interior photo */
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85&auto=format&fit=crop',
      description: 'Vibrant indoor-outdoor lounge celebrating royal heritage with a modern culinary twist.',
      capacity: '200 Guests',
      features: ['Indoor-Outdoor Fusion', 'Late Night Dining', 'DJ Evenings', 'Chef Table']
    }
  ],
  menu: [
    {
      id: 'm-1',
      name: 'Guntur Mirchi Lobster Tikka',
      category: 'Starters',
      price: 850,
      description: 'Fresh Bay of Bengal lobster tail roasted with smoked Guntur chillies, saffron garlic butter, and fresh cilantro oil.',
      diet: 'Non-Veg',
      spicyLevel: 3,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80',
      rating: 4.9
    },
    {
      id: 'm-2',
      name: 'Gold Leaf Zafrani Paneer Pasanda',
      category: 'Starters',
      price: 580,
      description: 'Stuffed malai cottage cheese pinwheels cooked in royal Kashmiri saffron cream, topped with 24k edible gold leaf.',
      diet: 'Veg',
      spicyLevel: 1,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80',
      rating: 4.95
    },
    {
      id: 'm-3',
      name: 'Tandoori Avocado & Truffle Chaat',
      category: 'Starters',
      price: 520,
      description: 'Wood-fired Hass avocado served over crisp artisanal papdi with pomegranate pearls, mint emulsion, and black truffle drizzle.',
      diet: 'Veg',
      spicyLevel: 1,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
      rating: 4.8
    },
    {
      id: 'm-4',
      name: 'Telangana Smoked Mutton Chops',
      category: 'Starters',
      price: 790,
      description: 'Prime lamb chops marinated in Telangana pot spices and roasted over banyan charcoal, served with mint chutney.',
      diet: 'Non-Veg',
      spicyLevel: 2,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      rating: 4.88
    },
    {
      id: 'm-5',
      name: 'Nizam-i Shahi Nalli Nihari',
      category: 'Main Course',
      price: 920,
      description: 'Slow-cooked shank of tender lamb infused with 32 hand-ground Nizami spices, simmered for 18 hours in clay pots.',
      diet: 'Non-Veg',
      spicyLevel: 2,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      rating: 4.98
    },
    {
      id: 'm-6',
      name: 'Dreams Dal Royal',
      category: 'Main Course',
      price: 490,
      description: 'Black lentils slow-simmered overnight over white wood ash, enriched with white butter and clove smoke infusion.',
      diet: 'Veg',
      spicyLevel: 1,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
      rating: 4.92
    },
    {
      id: 'm-7',
      name: 'Hyderabadi Dum Ka Murgh',
      category: 'Main Course',
      price: 720,
      description: 'Free-range chicken slow-braised in almond, cashew, and melon seed reduction, sealed under a baked dough seal.',
      diet: 'Non-Veg',
      spicyLevel: 2,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
      rating: 4.85
    },
    {
      id: 'm-8',
      name: 'Paneer Khurchan Kebab Masala',
      category: 'Main Course',
      price: 590,
      description: 'Hand-grated cottage cheese wok-tossed with tri-color sweet peppers, heirloom tomato reduction, and roasted cumin.',
      diet: 'Veg',
      spicyLevel: 1,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
      rating: 4.79
    },
    {
      id: 'm-9',
      name: 'Prawn Malai Curry & Raw Mango',
      category: 'Main Course',
      price: 880,
      description: 'Jumbo tiger prawns bathed in velvety coconut cream with green cardamom, mustard seeds, and raw mango slivers.',
      diet: 'Non-Veg',
      spicyLevel: 1,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
      rating: 4.91
    },
    {
      id: 'm-10',
      name: 'Dreams Signature Dum Mutton Biryani',
      category: 'Biryanis & Rice',
      price: 840,
      description: 'Aged long-grain Basmati rice dum-cooked with prime tender mutton, fresh mint, caramelized onions, and rare rose essence.',
      diet: 'Non-Veg',
      spicyLevel: 2,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
      rating: 4.99
    },
    {
      id: 'm-11',
      name: 'Kacchi Yakhni Chicken Biryani',
      category: 'Biryanis & Rice',
      price: 680,
      description: 'Traditional Hyderabadi raw-marinated chicken layered with saffron-infused Basmati rice and slow cooked over charcoal.',
      diet: 'Non-Veg',
      spicyLevel: 2,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
      rating: 4.88
    },
    {
      id: 'm-12',
      name: 'Royal Subz & Truffle Dum Biryani',
      category: 'Biryanis & Rice',
      price: 590,
      description: 'Seasonal heirloom root vegetables and wild portobello mushrooms layered with saffron rice, aged ghee, and black truffle oil.',
      diet: 'Veg',
      spicyLevel: 1,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&q=80',
      rating: 4.82
    },
    {
      id: 'm-13',
      name: 'Dreamscape Craft Elixir',
      category: 'Cocktails & Beverages',
      price: 650,
      description: '12-year single malt scotch, organic lavender rose reduction, smoked cardamom bitters, served over crystal ice sphere.',
      diet: 'Veg',
      spicyLevel: 0,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      rating: 4.96
    },
    {
      id: 'm-14',
      name: 'Charminar Sunset Spritz',
      category: 'Cocktails & Beverages',
      price: 580,
      description: 'Artisanal dry gin, Alphonso mango reduction, sparkling Italian prosecco, and star anise aura.',
      diet: 'Veg',
      spicyLevel: 0,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
      rating: 4.89
    },
    {
      id: 'm-15',
      name: 'Nizam Royal Jaljeera Mocktail',
      category: 'Cocktails & Beverages',
      price: 340,
      description: 'Pressed green apple juice, dry-roasted cumin dust, mint leaves, Himalayan pink rock salt, top-up sparkling tonic.',
      diet: 'Veg',
      spicyLevel: 0,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
      rating: 4.75
    },
    {
      id: 'm-16',
      name: 'Dreams Khubani Ka Meetha Parfait',
      category: 'Desserts',
      price: 450,
      description: 'Slow-stewed Turkish sun-dried apricots layered with almond brittle, saffron rabri cream, and artisanal pistachio gelato.',
      diet: 'Veg',
      spicyLevel: 0,
      isChefSpecial: true,
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
      rating: 4.95
    },
    {
      id: 'm-17',
      name: 'Double Ka Meetha Brûlée',
      category: 'Desserts',
      price: 420,
      description: 'Classic royal Nizami bread pudding reimagined with a caramelized sugar glass crust, condensed cardamom cream, and silver leaf.',
      diet: 'Veg',
      spicyLevel: 0,
      isChefSpecial: false,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80',
      rating: 4.86
    }
  ],
  reservations: [
    {
      id: 'DRM-84920',
      locationId: 'loc-1',
      locationName: 'Jubilee Hills Flagship',
      guestName: 'Vikramaditya Rao',
      email: 'vikram.rao@example.com',
      phone: '9849012345',
      guests: 4,
      date: '2026-10-06',
      time: '20:00',
      seating: 'Courtyard Cabana',
      occasion: 'Anniversary',
      specialRequests: 'Candlelight setup and complimentary dessert pre-arranged.',
      status: 'Confirmed',
      createdAt: '2026-10-04T18:30:00.000Z'
    },
    {
      id: 'DRM-84921',
      locationId: 'loc-2',
      locationName: 'Gachibowli Tech Hub',
      guestName: 'Ananya Sharma',
      email: 'ananya.s@example.com',
      phone: '9701234567',
      guests: 6,
      date: '2026-10-06',
      time: '21:00',
      seating: 'Rooftop Deck',
      occasion: 'Birthday',
      specialRequests: 'High table near the skyline edge if available.',
      status: 'Pending',
      createdAt: '2026-10-05T09:15:00.000Z'
    }
  ],
  orders: [
    {
      id: 'ORD-1092',
      customerName: 'Priya Verma',
      email: 'priya.v@example.com',
      phone: '9888877665',
      addressLine1: 'Villa 14, Jubilee Hills Rd 36',
      addressLine2: 'Jubilee Hills, Hyderabad',
      address: 'Villa 14, Jubilee Hills Rd 36, Jubilee Hills, Hyderabad',
      items: [
        { id: 'm-10', name: 'Dreams Signature Dum Mutton Biryani', price: 840, quantity: 2 },
        { id: 'm-2', name: 'Gold Leaf Zafrani Paneer Pasanda', price: 580, quantity: 1 },
        { id: 'm-16', name: 'Dreams Khubani Ka Meetha Parfait', price: 450, quantity: 2 }
      ],
      totalAmount: 3160,
      paymentMethod: 'UPI / Online',
      status: 'Preparing',
      createdAt: '2026-10-05T11:45:00.000Z'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Kavitha & Arvind Rao',
      rating: 5,
      date: '2 days ago',
      location: 'Jubilee Hills Flagship',
      comment: 'Dreams Kitchen redefines fine dining in Hyderabad! The courtyard ambiance under the warm starlight glow is magical. The Nalli Nihari melted in our mouths, and the Dum Biryani is effortlessly the best in the city. 10/10 service!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
    },
    {
      id: 'rev-2',
      author: 'Dr. Siddharth Menon',
      rating: 5,
      date: '1 week ago',
      location: 'Gachibowli Tech Hub',
      comment: 'Hosted an executive dinner at Dreams Kitchen rooftop branch. The Dreamscape Craft Elixir cocktail was outstanding, and the Zafrani Paneer with gold leaf blew all our guests away. Truly world-class hospitality.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    {
      id: 'rev-3',
      author: 'Samantha D’Souza',
      rating: 5,
      date: '2 weeks ago',
      location: 'Jubilee Hills Flagship',
      comment: 'The Dreams Khubani Ka Meetha Parfait alone is worth visiting Hyderabad for! Impeccable presentation, luxurious decor, and attentive staff. Will return for every special occasion.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80'
    }
  ],
  subscribers: [
    {
      id: 'sub-1',
      email: 'royal.patron@dreamskitchen.in',
      createdAt: '2026-10-04T12:00:00.000Z'
    },
    {
      id: 'sub-2',
      email: 'vikram.rao@example.com',
      createdAt: '2026-10-05T08:30:00.000Z'
    },
    {
      id: 'sub-3',
      email: 'ananya.sharma@techcorp.io',
      createdAt: '2026-10-05T10:15:00.000Z'
    }
  ]
};

export function getDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
  return INITIAL_DATA;
}

export function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
