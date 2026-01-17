import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { RoomCard } from '@/components/hotels/RoomCard';
import { ReviewCard } from '@/components/hotels/ReviewCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getHotelById, getRoomsByHotelId, getReviewsByHotelId } from '@/lib/mock-data';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Room } from '@/types';
import {
  Star,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  Sparkles,
  Plane,
  Wind,
  PawPrint,
  Umbrella,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const amenityIcons: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi className="h-5 w-5" />,
  'Swimming Pool': <Waves className="h-5 w-5" />,
  'Spa': <Sparkles className="h-5 w-5" />,
  'Gym': <Dumbbell className="h-5 w-5" />,
  'Restaurant': <UtensilsCrossed className="h-5 w-5" />,
  'Bar': <Wine className="h-5 w-5" />,
  'Parking': <Car className="h-5 w-5" />,
  'Airport Shuttle': <Plane className="h-5 w-5" />,
  'Air Conditioning': <Wind className="h-5 w-5" />,
  'Pet Friendly': <PawPrint className="h-5 w-5" />,
  'Beach Access': <Umbrella className="h-5 w-5" />,
};

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { setBookingDetails } = useBooking();

  const hotel = getHotelById(Number(id));
  const rooms = getRoomsByHotelId(Number(id));
  const reviews = getReviewsByHotelId(Number(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : undefined
  );
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2);
  const [roomsCount, setRoomsCount] = useState(Number(searchParams.get('rooms')) || 1);

  if (!hotel) {
    return (
      <Layout>
        <div className="container-app py-12 text-center">
          <h1 className="text-2xl font-bold">Hotel not found</h1>
          <Button onClick={() => navigate('/search')} className="mt-4">
            Browse Hotels
          </Button>
        </div>
      </Layout>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const handleSelectRoom = (room: Room) => {
    if (!checkIn || !checkOut) {
      return;
    }

    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setBookingDetails({
      hotel,
      room,
      checkIn,
      checkOut,
      guests,
      roomsCount,
    });
    navigate('/checkout');
  };

  const allImages = hotel.images.length > 0 ? hotel.images : [{ id: 0, hotelId: hotel.id, imageUrl: hotel.mainImage }];

  return (
    <Layout>
      {/* Hero Gallery */}
      <div className="relative h-[400px] md:h-[500px] bg-muted">
        <img
          src={allImages[currentImageIndex].imageUrl}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Image Navigation */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  )}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </>
        )}

        {/* Hotel Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container-app">
            <Badge className="mb-2 bg-white/20 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              {hotel.rating} ({hotel.reviewCount} reviews)
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-1 mt-2 text-white/90">
              <MapPin className="h-4 w-4" />
              <span>{hotel.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                {hotel.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="text-primary">
                      {amenityIcons[amenity.name] || <Sparkles className="h-5 w-5" />}
                    </div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rooms */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">
                Available Rooms
              </h2>
              {!checkIn || !checkOut ? (
                <div className="p-6 rounded-xl border border-border bg-muted/50 text-center">
                  <p className="text-muted-foreground">
                    Select check-in and check-out dates to see room availability
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      nights={nights}
                      onSelect={handleSelectRoom}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">
                Guest Reviews ({reviews.length})
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet.</p>
              )}
            </section>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  ${hotel.lowestPrice}
                </span>
                <span className="text-muted-foreground">/ night</span>
              </div>

              <div className="space-y-4">
                {/* Check In */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Check In
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !checkIn && 'text-muted-foreground'
                        )}
                      >
                        {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Check Out */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Check Out
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !checkOut && 'text-muted-foreground'
                        )}
                      >
                        {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests & Rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Guests
                    </label>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </Button>
                      <span>{guests}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Rooms
                    </label>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      >
                        -
                      </Button>
                      <span>{roomsCount}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setRoomsCount(Math.min(5, roomsCount + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        ${hotel.lowestPrice} × {nights} nights
                      </span>
                      <span>${hotel.lowestPrice! * nights}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Starting from</span>
                      <span className="text-xl">${hotel.lowestPrice! * nights}</span>
                    </div>
                  </div>
                )}

                <Button
                  variant="gradient"
                  className="w-full mt-4"
                  size="lg"
                  disabled={!checkIn || !checkOut}
                >
                  {checkIn && checkOut ? 'View Rooms & Book' : 'Select Dates'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
