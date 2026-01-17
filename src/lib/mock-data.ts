import { Hotel, Room, Booking, Review, User, Amenity } from '@/types';

export const amenities: Amenity[] = [
  { id: 1, name: 'Free WiFi', icon: 'Wifi' },
  { id: 2, name: 'Swimming Pool', icon: 'Waves' },
  { id: 3, name: 'Spa', icon: 'Sparkles' },
  { id: 4, name: 'Gym', icon: 'Dumbbell' },
  { id: 5, name: 'Restaurant', icon: 'UtensilsCrossed' },
  { id: 6, name: 'Bar', icon: 'Wine' },
  { id: 7, name: 'Parking', icon: 'Car' },
  { id: 8, name: 'Airport Shuttle', icon: 'Plane' },
  { id: 9, name: 'Room Service', icon: 'ConciergeBell' },
  { id: 10, name: 'Air Conditioning', icon: 'Wind' },
  { id: 11, name: 'Pet Friendly', icon: 'PawPrint' },
  { id: 12, name: 'Beach Access', icon: 'Umbrella' },
];

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'The Grand Pacific Resort',
    city: 'Miami',
    address: '1200 Ocean Drive, Miami Beach, FL 33139',
    description: 'Experience luxury at its finest at The Grand Pacific Resort. Nestled along the pristine shores of Miami Beach, our resort offers breathtaking ocean views, world-class amenities, and unparalleled service. From our infinity pool overlooking the Atlantic to our award-winning spa, every detail is designed for your ultimate relaxation.',
    rating: 4.8,
    reviewCount: 1247,
    lat: 25.7826,
    lng: -80.1341,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    images: [
      { id: 1, hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' },
      { id: 2, hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop' },
      { id: 3, hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop' },
      { id: 4, hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[1], amenities[2], amenities[3], amenities[4], amenities[5], amenities[6]],
    lowestPrice: 299,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'Urban Oasis Hotel',
    city: 'New York',
    address: '250 Park Avenue, New York, NY 10177',
    description: 'Located in the heart of Manhattan, Urban Oasis Hotel offers a sophisticated retreat from the bustling city. Our elegantly designed rooms feature floor-to-ceiling windows with stunning skyline views, modern amenities, and premium bedding for the perfect night\'s rest.',
    rating: 4.6,
    reviewCount: 892,
    lat: 40.7549,
    lng: -73.9768,
    mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    images: [
      { id: 5, hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop' },
      { id: 6, hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop' },
      { id: 7, hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[3], amenities[4], amenities[5], amenities[8], amenities[9]],
    lowestPrice: 425,
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 3,
    name: 'Sunset Bay Resort',
    city: 'Los Angeles',
    address: '500 Pacific Coast Highway, Malibu, CA 90265',
    description: 'Perched on the cliffs of Malibu, Sunset Bay Resort offers an exclusive escape with panoramic Pacific Ocean views. Watch the sunset from your private balcony, indulge in our oceanfront restaurant, or rejuvenate at our cliff-side spa.',
    rating: 4.9,
    reviewCount: 756,
    lat: 34.0259,
    lng: -118.7798,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    images: [
      { id: 8, hotelId: 3, imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop' },
      { id: 9, hotelId: 3, imageUrl: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop' },
      { id: 10, hotelId: 3, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[1], amenities[2], amenities[4], amenities[5], amenities[6], amenities[11]],
    lowestPrice: 550,
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 4,
    name: 'Mountain View Lodge',
    city: 'Denver',
    address: '1800 Ski Run Road, Vail, CO 81657',
    description: 'Embrace the beauty of the Rocky Mountains at Mountain View Lodge. Whether you\'re hitting the slopes or exploring scenic trails, our lodge provides the perfect basecamp with cozy rooms, a roaring fireplace, and mountain cuisine.',
    rating: 4.7,
    reviewCount: 534,
    lat: 39.6403,
    lng: -106.3742,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    images: [
      { id: 11, hotelId: 4, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop' },
      { id: 12, hotelId: 4, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[2], amenities[3], amenities[4], amenities[6], amenities[10]],
    lowestPrice: 275,
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 5,
    name: 'Riverside Boutique Hotel',
    city: 'Chicago',
    address: '200 N Wacker Drive, Chicago, IL 60606',
    description: 'A stylish boutique hotel on the banks of the Chicago River, offering intimate luxury with stunning waterfront views. Our curated art collection, rooftop bar, and personalized service create an unforgettable urban experience.',
    rating: 4.5,
    reviewCount: 678,
    lat: 41.8857,
    lng: -87.6368,
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
    images: [
      { id: 13, hotelId: 5, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop' },
      { id: 14, hotelId: 5, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[4], amenities[5], amenities[6], amenities[8], amenities[9]],
    lowestPrice: 320,
    createdAt: '2024-02-28T00:00:00Z',
  },
  {
    id: 6,
    name: 'The Historic Plaza',
    city: 'San Francisco',
    address: '335 Powell Street, San Francisco, CA 94102',
    description: 'A landmark of elegance in the heart of Union Square, The Historic Plaza combines classic architecture with modern luxury. Explore iconic San Francisco from our central location while enjoying timeless hospitality.',
    rating: 4.4,
    reviewCount: 1123,
    lat: 37.7879,
    lng: -122.4074,
    mainImage: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
    images: [
      { id: 15, hotelId: 6, imageUrl: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop' },
      { id: 16, hotelId: 6, imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[3], amenities[4], amenities[5], amenities[6], amenities[8]],
    lowestPrice: 385,
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 7,
    name: 'Tropical Paradise Resort',
    city: 'Honolulu',
    address: '2199 Kalia Road, Honolulu, HI 96815',
    description: 'Escape to paradise at our beachfront resort in Waikiki. With swaying palms, crystal-clear waters, and authentic Hawaiian hospitality, every moment is a celebration of island life.',
    rating: 4.8,
    reviewCount: 2156,
    lat: 21.2793,
    lng: -157.8293,
    mainImage: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800&h=600&fit=crop',
    images: [
      { id: 17, hotelId: 7, imageUrl: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800&h=600&fit=crop' },
      { id: 18, hotelId: 7, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[1], amenities[2], amenities[4], amenities[5], amenities[7], amenities[11]],
    lowestPrice: 475,
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 8,
    name: 'Desert Bloom Resort & Spa',
    city: 'Phoenix',
    address: '7575 E Princess Drive, Scottsdale, AZ 85255',
    description: 'An oasis in the Sonoran Desert, Desert Bloom offers a unique blend of southwestern charm and modern luxury. Relax by our desert-inspired pools, golf on championship courses, or explore the stunning desert landscape.',
    rating: 4.6,
    reviewCount: 445,
    lat: 33.6889,
    lng: -111.9053,
    mainImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
    images: [
      { id: 19, hotelId: 8, imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop' },
      { id: 20, hotelId: 8, imageUrl: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[1], amenities[2], amenities[3], amenities[4], amenities[6], amenities[10]],
    lowestPrice: 345,
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 9,
    name: 'Lakefront Inn',
    city: 'Seattle',
    address: '1000 1st Avenue, Seattle, WA 98104',
    description: 'Overlooking the beautiful Puget Sound, Lakefront Inn offers serene views and easy access to Seattle\'s vibrant waterfront. Enjoy fresh seafood, explore Pike Place Market, and watch ferries glide across the water.',
    rating: 4.3,
    reviewCount: 567,
    lat: 47.6062,
    lng: -122.3321,
    mainImage: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop',
    images: [
      { id: 21, hotelId: 9, imageUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop' },
      { id: 22, hotelId: 9, imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[4], amenities[5], amenities[6], amenities[8], amenities[9]],
    lowestPrice: 265,
    createdAt: '2024-02-22T00:00:00Z',
  },
  {
    id: 10,
    name: 'Garden State Luxury Suites',
    city: 'Boston',
    address: '776 Boylston Street, Boston, MA 02199',
    description: 'Located in Boston\'s Back Bay, Garden State Luxury Suites offers spacious accommodations with a New England charm. Walk to historic landmarks, world-class dining, and renowned museums.',
    rating: 4.5,
    reviewCount: 389,
    lat: 42.3493,
    lng: -71.0798,
    mainImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    images: [
      { id: 23, hotelId: 10, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop' },
      { id: 24, hotelId: 10, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop' },
    ],
    amenities: [amenities[0], amenities[3], amenities[4], amenities[6], amenities[8], amenities[9]],
    lowestPrice: 355,
    createdAt: '2024-03-01T00:00:00Z',
  },
];

export const rooms: Room[] = [
  // Hotel 1 - The Grand Pacific Resort
  { id: 1, hotelId: 1, name: 'Ocean View Standard', roomType: 'standard', capacity: 2, pricePerNight: 299, totalRooms: 20, images: [{ id: 1, roomId: 1, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Ocean View', 'Mini Bar'], createdAt: '2024-01-15T00:00:00Z' },
  { id: 2, hotelId: 1, name: 'Ocean View Deluxe', roomType: 'deluxe', capacity: 2, pricePerNight: 399, totalRooms: 15, images: [{ id: 2, roomId: 2, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Balcony', 'Ocean View', 'Mini Bar', 'Work Desk'], createdAt: '2024-01-15T00:00:00Z' },
  { id: 3, hotelId: 1, name: 'Premium Suite', roomType: 'suite', capacity: 4, pricePerNight: 599, totalRooms: 8, images: [{ id: 3, roomId: 3, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Living Room', 'Jacuzzi', 'Ocean View', 'Private Balcony'], createdAt: '2024-01-15T00:00:00Z' },
  { id: 4, hotelId: 1, name: 'Presidential Suite', roomType: 'premium', capacity: 6, pricePerNight: 1299, totalRooms: 2, images: [{ id: 4, roomId: 4, imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&h=400&fit=crop' }], amenities: ['2 King Beds', 'Living Room', 'Dining Room', 'Jacuzzi', 'Butler Service'], createdAt: '2024-01-15T00:00:00Z' },

  // Hotel 2 - Urban Oasis Hotel
  { id: 5, hotelId: 2, name: 'City View Room', roomType: 'standard', capacity: 2, pricePerNight: 425, totalRooms: 25, images: [{ id: 5, roomId: 5, imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop' }], amenities: ['Queen Bed', 'City View', 'Work Desk'], createdAt: '2024-02-10T00:00:00Z' },
  { id: 6, hotelId: 2, name: 'Executive Suite', roomType: 'suite', capacity: 3, pricePerNight: 625, totalRooms: 10, images: [{ id: 6, roomId: 6, imageUrl: 'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Living Area', 'Skyline View', 'Executive Lounge Access'], createdAt: '2024-02-10T00:00:00Z' },

  // Hotel 3 - Sunset Bay Resort
  { id: 7, hotelId: 3, name: 'Cliff View Room', roomType: 'deluxe', capacity: 2, pricePerNight: 550, totalRooms: 12, images: [{ id: 7, roomId: 7, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Ocean View', 'Private Terrace'], createdAt: '2024-01-20T00:00:00Z' },
  { id: 8, hotelId: 3, name: 'Ocean Villa', roomType: 'premium', capacity: 4, pricePerNight: 950, totalRooms: 6, images: [{ id: 8, roomId: 8, imageUrl: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&h=400&fit=crop' }], amenities: ['2 King Beds', 'Private Pool', 'Ocean View', 'Butler Service'], createdAt: '2024-01-20T00:00:00Z' },

  // Hotel 4 - Mountain View Lodge
  { id: 9, hotelId: 4, name: 'Mountain Room', roomType: 'standard', capacity: 2, pricePerNight: 275, totalRooms: 18, images: [{ id: 9, roomId: 9, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop' }], amenities: ['Queen Bed', 'Mountain View', 'Fireplace'], createdAt: '2024-03-05T00:00:00Z' },
  { id: 10, hotelId: 4, name: 'Ski Chalet Suite', roomType: 'suite', capacity: 4, pricePerNight: 475, totalRooms: 8, images: [{ id: 10, roomId: 10, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop' }], amenities: ['2 Queen Beds', 'Living Room', 'Ski Storage', 'Mountain View'], createdAt: '2024-03-05T00:00:00Z' },

  // Hotel 5 - Riverside Boutique Hotel
  { id: 11, hotelId: 5, name: 'River View Room', roomType: 'standard', capacity: 2, pricePerNight: 320, totalRooms: 15, images: [{ id: 11, roomId: 11, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'River View', 'Work Desk'], createdAt: '2024-02-28T00:00:00Z' },
  { id: 12, hotelId: 5, name: 'Penthouse Suite', roomType: 'premium', capacity: 4, pricePerNight: 750, totalRooms: 3, images: [{ id: 12, roomId: 12, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Rooftop Access', 'Jacuzzi', 'Skyline View'], createdAt: '2024-02-28T00:00:00Z' },

  // Hotel 6 - The Historic Plaza
  { id: 13, hotelId: 6, name: 'Classic Room', roomType: 'standard', capacity: 2, pricePerNight: 385, totalRooms: 30, images: [{ id: 13, roomId: 13, imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop' }], amenities: ['Queen Bed', 'City View', 'Classic Decor'], createdAt: '2024-01-05T00:00:00Z' },
  { id: 14, hotelId: 6, name: 'Heritage Suite', roomType: 'suite', capacity: 3, pricePerNight: 585, totalRooms: 10, images: [{ id: 14, roomId: 14, imageUrl: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Living Room', 'Historic Features', 'City View'], createdAt: '2024-01-05T00:00:00Z' },

  // Hotel 7 - Tropical Paradise Resort
  { id: 15, hotelId: 7, name: 'Garden View Room', roomType: 'standard', capacity: 2, pricePerNight: 475, totalRooms: 22, images: [{ id: 15, roomId: 15, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Garden View', 'Lanai'], createdAt: '2024-02-15T00:00:00Z' },
  { id: 16, hotelId: 7, name: 'Oceanfront Suite', roomType: 'suite', capacity: 4, pricePerNight: 875, totalRooms: 8, images: [{ id: 16, roomId: 16, imageUrl: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Ocean View', 'Private Lanai', 'Kitchenette'], createdAt: '2024-02-15T00:00:00Z' },

  // Hotel 8 - Desert Bloom Resort & Spa
  { id: 17, hotelId: 8, name: 'Desert View Room', roomType: 'standard', capacity: 2, pricePerNight: 345, totalRooms: 20, images: [{ id: 17, roomId: 17, imageUrl: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Desert View', 'Patio'], createdAt: '2024-03-10T00:00:00Z' },
  { id: 18, hotelId: 8, name: 'Casita Suite', roomType: 'suite', capacity: 4, pricePerNight: 595, totalRooms: 10, images: [{ id: 18, roomId: 18, imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Private Patio', 'Fireplace', 'Desert View'], createdAt: '2024-03-10T00:00:00Z' },

  // Hotel 9 - Lakefront Inn
  { id: 19, hotelId: 9, name: 'Harbor View Room', roomType: 'standard', capacity: 2, pricePerNight: 265, totalRooms: 25, images: [{ id: 19, roomId: 19, imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=600&h=400&fit=crop' }], amenities: ['Queen Bed', 'Water View', 'Work Desk'], createdAt: '2024-02-22T00:00:00Z' },
  { id: 20, hotelId: 9, name: 'Waterfront Suite', roomType: 'deluxe', capacity: 3, pricePerNight: 425, totalRooms: 8, images: [{ id: 20, roomId: 20, imageUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Living Area', 'Water View', 'Balcony'], createdAt: '2024-02-22T00:00:00Z' },

  // Hotel 10 - Garden State Luxury Suites
  { id: 21, hotelId: 10, name: 'Garden Suite', roomType: 'standard', capacity: 2, pricePerNight: 355, totalRooms: 18, images: [{ id: 21, roomId: 21, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Garden View', 'Work Desk'], createdAt: '2024-03-01T00:00:00Z' },
  { id: 22, hotelId: 10, name: 'Grand Suite', roomType: 'premium', capacity: 4, pricePerNight: 655, totalRooms: 5, images: [{ id: 22, roomId: 22, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop' }], amenities: ['King Bed', 'Living Room', 'Dining Area', 'City View'], createdAt: '2024-03-01T00:00:00Z' },
];

export const reviews: Review[] = [
  { id: 1, userId: 2, hotelId: 1, rating: 5, comment: 'Absolutely stunning resort! The ocean views are breathtaking and the staff went above and beyond.', user: { id: 2, name: 'Sarah Johnson' }, createdAt: '2024-03-15T10:30:00Z' },
  { id: 2, userId: 3, hotelId: 1, rating: 4, comment: 'Great location and amenities. The pool area is fantastic. Would definitely stay again!', user: { id: 3, name: 'Michael Chen' }, createdAt: '2024-03-10T14:20:00Z' },
  { id: 3, userId: 2, hotelId: 2, rating: 5, comment: 'Perfect Manhattan location. Room was modern and comfortable with incredible city views.', user: { id: 2, name: 'Sarah Johnson' }, createdAt: '2024-03-08T09:15:00Z' },
  { id: 4, userId: 3, hotelId: 3, rating: 5, comment: 'The most beautiful sunset I\'ve ever seen from my balcony. Worth every penny!', user: { id: 3, name: 'Michael Chen' }, createdAt: '2024-03-05T18:45:00Z' },
  { id: 5, userId: 2, hotelId: 4, rating: 4, comment: 'Cozy mountain retreat. The fireplace in the room made it so romantic!', user: { id: 2, name: 'Sarah Johnson' }, createdAt: '2024-03-01T20:00:00Z' },
];

export const bookings: Booking[] = [
  { id: 1, userId: 2, hotelId: 1, roomId: 2, checkIn: '2024-04-15', checkOut: '2024-04-18', guests: 2, roomsCount: 1, totalAmount: 1197, status: 'confirmed', paymentStatus: 'paid', hotel: hotels[0], room: rooms[1], createdAt: '2024-03-20T10:30:00Z' },
  { id: 2, userId: 2, hotelId: 3, roomId: 7, checkIn: '2024-05-01', checkOut: '2024-05-05', guests: 2, roomsCount: 1, totalAmount: 2200, status: 'confirmed', paymentStatus: 'paid', hotel: hotels[2], room: rooms[6], createdAt: '2024-03-18T14:20:00Z' },
  { id: 3, userId: 3, hotelId: 2, roomId: 5, checkIn: '2024-03-10', checkOut: '2024-03-12', guests: 2, roomsCount: 1, totalAmount: 850, status: 'completed', paymentStatus: 'paid', hotel: hotels[1], room: rooms[4], createdAt: '2024-02-28T09:15:00Z' },
  { id: 4, userId: 2, hotelId: 7, roomId: 16, checkIn: '2024-06-10', checkOut: '2024-06-17', guests: 4, roomsCount: 1, totalAmount: 6125, status: 'pending', paymentStatus: 'pending', hotel: hotels[6], room: rooms[15], createdAt: '2024-03-22T16:45:00Z' },
];

export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@hotelbooking.com', phone: '+1234567890', role: 'admin', status: 'active', createdAt: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1987654321', role: 'user', status: 'active', createdAt: '2024-01-15T10:30:00Z' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', phone: '+1122334455', role: 'user', status: 'active', createdAt: '2024-02-01T14:20:00Z' },
];

export const cities = ['Miami', 'New York', 'Los Angeles', 'Denver', 'Chicago', 'San Francisco', 'Honolulu', 'Phoenix', 'Seattle', 'Boston'];

export const propertyTypes = ['Resort', 'Hotel', 'Boutique', 'Lodge', 'Inn'];

export function getHotelById(id: number): Hotel | undefined {
  return hotels.find(h => h.id === id);
}

export function getRoomsByHotelId(hotelId: number): Room[] {
  return rooms.filter(r => r.hotelId === hotelId);
}

export function getReviewsByHotelId(hotelId: number): Review[] {
  return reviews.filter(r => r.hotelId === hotelId);
}

export function searchHotels(params: {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  amenities?: number[];
  sortBy?: string;
}): Hotel[] {
  let filtered = [...hotels];

  if (params.city) {
    filtered = filtered.filter(h => h.city.toLowerCase().includes(params.city!.toLowerCase()));
  }

  if (params.minPrice !== undefined) {
    filtered = filtered.filter(h => (h.lowestPrice || 0) >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(h => (h.lowestPrice || 0) <= params.maxPrice!);
  }

  if (params.rating !== undefined) {
    filtered = filtered.filter(h => h.rating >= params.rating!);
  }

  if (params.amenities && params.amenities.length > 0) {
    filtered = filtered.filter(h =>
      params.amenities!.every(amenityId =>
        h.amenities.some(a => a.id === amenityId)
      )
    );
  }

  // Sort
  switch (params.sortBy) {
    case 'price_asc':
      filtered.sort((a, b) => (a.lowestPrice || 0) - (b.lowestPrice || 0));
      break;
    case 'price_desc':
      filtered.sort((a, b) => (b.lowestPrice || 0) - (a.lowestPrice || 0));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      break;
  }

  return filtered;
}
