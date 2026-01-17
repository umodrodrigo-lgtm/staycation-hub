import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { bookings } from '@/lib/mock-data';
import { Calendar, MapPin, Users, CreditCard, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const checkoutSchema = z.object({
  guestName: z.string().min(2, 'Name is required'),
  guestEmail: z.string().email('Valid email is required'),
  guestPhone: z.string().min(10, 'Valid phone number is required'),
  specialRequests: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hotel, room, checkIn, checkOut, guests, roomsCount, getTotalNights, getTotalPrice, clearBooking } = useBooking();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      guestName: user?.name || '',
      guestEmail: user?.email || '',
      guestPhone: user?.phone || '',
    },
  });

  if (!hotel || !room || !checkIn || !checkOut) {
    return (
      <Layout>
        <div className="container-app py-12 text-center">
          <h1 className="text-2xl font-bold">No booking in progress</h1>
          <p className="text-muted-foreground mt-2">Start by selecting a hotel and room.</p>
          <Button onClick={() => navigate('/search')} className="mt-4">
            Browse Hotels
          </Button>
        </div>
      </Layout>
    );
  }

  const nights = getTotalNights();
  const subtotal = getTotalPrice();
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newBooking = {
      id: bookings.length + 1,
      userId: user!.id,
      hotelId: hotel.id,
      roomId: room.id,
      checkIn: format(checkIn, 'yyyy-MM-dd'),
      checkOut: format(checkOut, 'yyyy-MM-dd'),
      guests,
      roomsCount,
      totalAmount: total,
      status: 'confirmed' as const,
      paymentStatus: 'paid' as const,
      hotel,
      room,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    clearBooking();
    toast.success('Booking confirmed!');
    navigate(`/confirmation/${newBooking.id}`);
  };

  return (
    <Layout>
      <div className="container-app py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary Card */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex gap-4">
                <img
                  src={room.images[0]?.imageUrl || hotel.mainImage}
                  alt={room.name}
                  className="w-32 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-display font-semibold text-lg">{hotel.name}</h2>
                  <p className="text-muted-foreground text-sm">{room.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{hotel.city}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Check-in
                  </p>
                  <p className="font-medium">{format(checkIn, 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Check-out
                  </p>
                  <p className="font-medium">{format(checkOut, 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Guests
                  </p>
                  <p className="font-medium">{guests} guests, {roomsCount} room{roomsCount > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Guest Details Form */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-display font-semibold text-lg mb-4">Guest Details</h3>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guestName">Full Name</Label>
                    <Input
                      id="guestName"
                      placeholder="Enter your full name"
                      {...register('guestName')}
                    />
                    {errors.guestName && (
                      <p className="text-sm text-destructive">{errors.guestName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guestEmail">Email</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      placeholder="Enter your email"
                      {...register('guestEmail')}
                    />
                    {errors.guestEmail && (
                      <p className="text-sm text-destructive">{errors.guestEmail.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Phone Number</Label>
                  <Input
                    id="guestPhone"
                    placeholder="Enter your phone number"
                    {...register('guestPhone')}
                  />
                  {errors.guestPhone && (
                    <p className="text-sm text-destructive">{errors.guestPhone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requests for your stay..."
                    rows={3}
                    {...register('specialRequests')}
                  />
                </div>
              </form>
            </div>

            {/* Payment Info */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </h3>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  This is a demo application. No actual payment will be processed.
                </p>
              </div>
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="font-display font-semibold text-lg mb-4">Price Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${room.pricePerNight} × {nights} night{nights > 1 ? 's' : ''} × {roomsCount} room{roomsCount > 1 ? 's' : ''}
                  </span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees (12%)</span>
                  <span>${taxes}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              <Button
                form="checkout-form"
                type="submit"
                variant="gradient"
                className="w-full mt-6"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Confirm Booking
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By confirming, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
