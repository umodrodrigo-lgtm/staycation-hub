// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

// Hotel Types
export interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  mainImage: string;
  images: HotelImage[];
  amenities: Amenity[];
  lowestPrice?: number;
  createdAt: string;
}

export interface HotelImage {
  id: number;
  hotelId: number;
  imageUrl: string;
}

export interface Amenity {
  id: number;
  name: string;
  icon?: string;
}

// Room Types
export interface Room {
  id: number;
  hotelId: number;
  name: string;
  roomType: 'standard' | 'deluxe' | 'suite' | 'premium';
  capacity: number;
  pricePerNight: number;
  totalRooms: number;
  availableRooms?: number;
  images: RoomImage[];
  amenities?: string[];
  createdAt: string;
}

export interface RoomImage {
  id: number;
  roomId: number;
  imageUrl: string;
}

// Booking Types
export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  hotel?: Hotel;
  room?: Room;
  user?: User;
  createdAt: string;
}

// Review Types
export interface Review {
  id: number;
  userId: number;
  hotelId: number;
  rating: number;
  comment: string;
  user?: Pick<User, 'id' | 'name'>;
  createdAt: string;
}

// Search & Filter Types
export interface SearchParams {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: number[];
  propertyType?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'popularity';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface BookingForm {
  hotelId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

// Admin Stats
export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  totalHotels: number;
  totalUsers: number;
  recentBookings: Booking[];
  bookingsByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
}
