import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { bookings } from '@/lib/mock-data';
import { CheckCircle, Calendar, MapPin, Users, Home, Download } from 'lucide-react';

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const booking = bookings.find((b) => b.id === Number(bookingId));

  if (!booking) {
    return (
      <Layout>
        <div className="container-app py-12 text-center">
          <h1 className="text-2xl font-bold">Booking not found</h1>
          <Button asChild className="mt-4">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your reservation has been successfully processed.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Confirmation #{booking.id.toString().padStart(6, '0')}
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="p-6 rounded-xl border border-border bg-card shadow-card animate-slide-up">
            {/* Hotel Info */}
            <div className="flex gap-4 pb-6 border-b border-border">
              <img
                src={booking.hotel?.mainImage || '/placeholder.svg'}
                alt={booking.hotel?.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-display font-semibold text-lg">
                  {booking.hotel?.name}
                </h2>
                <p className="text-muted-foreground">{booking.room?.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{booking.hotel?.city}</span>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Check-in
                </p>
                <p className="font-medium">
                  {format(new Date(booking.checkIn), 'EEEE, MMM dd, yyyy')}
                </p>
                <p className="text-sm text-muted-foreground">From 3:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Check-out
                </p>
                <p className="font-medium">
                  {format(new Date(booking.checkOut), 'EEEE, MMM dd, yyyy')}
                </p>
                <p className="text-sm text-muted-foreground">Before 11:00 AM</p>
              </div>
            </div>

            {/* Guest Info */}
            <div className="py-6 border-b border-border">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <Users className="h-3.5 w-3.5" />
                Guests
              </div>
              <p className="font-medium">
                {booking.guests} guests, {booking.roomsCount} room{booking.roomsCount > 1 ? 's' : ''}
              </p>
            </div>

            {/* Price Summary */}
            <div className="pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Paid</span>
                <span className="text-primary">${booking.totalAmount}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Payment Status: <span className="text-success font-medium">Paid</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild variant="gradient" size="lg" className="flex-1">
              <Link to="/my-bookings">
                <Calendar className="h-4 w-4 mr-2" />
                View My Bookings
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Important Info */}
          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-medium mb-2">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• A confirmation email has been sent to your email address</li>
              <li>• Please present your confirmation number at check-in</li>
              <li>• Free cancellation is available up to 24 hours before check-in</li>
              <li>• Contact the hotel directly for any special requests</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
