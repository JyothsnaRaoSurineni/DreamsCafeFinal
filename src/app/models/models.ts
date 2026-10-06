export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  diet: string;
  spicyLevel: number;
  isChefSpecial: boolean;
  image: string;
  rating?: number;
  quantity?: number;
}

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  image: string;
  description: string;
  capacity: string;
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  avatar: string;
}

export interface Reservation {
  id: string;
  locationId: string;
  locationName: string;
  guestName: string;
  email?: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seating: string;
  occasion: string;
  specialRequests?: string;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email?: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalReservations: number;
  pendingReservations: number;
  activeMenuItems: number;
  totalSubscribers: number;
  averageRating: string;
}
