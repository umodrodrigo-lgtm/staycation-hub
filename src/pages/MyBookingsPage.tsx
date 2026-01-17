import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { bookings } from '@/lib/mock-data';
import { Calendar, MapPin, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [localBookings, setLocalBookings] = useState(
    bookings.filter((b) => b.userId === user?.id)
  );

  const now = new Date();
  const upcomingBookings = localBookings.filter(
    (b) => new Date(b.checkIn) >= now && b.status !== 'cancelled'
  );
  const pastBookings = localBookings.filter(
    (b) => new Date(b.checkOut) < now || b.status === 'completed'
  );
  const cancelledBookings = localBookings.filter((b) => b.status === 'cancelled');

  const handleCancel = (bookingId: number) => {
    setLocalBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    );
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = 'cancelled';
    }
    toast.success('Booking cancelled successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="badge-confirmed">Confirmed</Badge>;
      case 'pending':
        return <Badge className="badge-pending">Pending</Badge>;
      case 'cancelled':
        return <Badge className="badge-cancelled">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const BookingCard = ({ booking }: { booking: typeof localBookings[0] }) => (
    <div className="p-4 rounded-xl border border-border bg-card hover:shadow-card transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={booking.hotel?.mainImage || '/placeholder.svg'}
          alt={booking.hotel?.name}
          className="w-full sm:w-32 h-32 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold">{booking.hotel?.name}</h3>
              <p className="text-sm text-muted-foreground">{booking.room?.name}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{booking.hotel?.city}</span>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {format(new Date(booking.checkIn), 'MMM dd')} -{' '}
                {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="font-semibold">${booking.totalAmount}</div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button asChild variant="outline" size="sm">
              <Link to={`/hotel/${booking.hotelId}`}>
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                View Hotel
              </Link>
            </Button>
            {booking.status === 'confirmed' && new Date(booking.checkIn) > now && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/10">
                    <X className="h-3.5 w-3.5 mr-1" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel your booking at {booking.hotel?.name}?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCancel(booking.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Cancel Booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{message}</p>
      <Button asChild className="mt-4">
        <Link to="/search">Browse Hotels</Link>
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container-app py-8">
        <h1 className="font-display text-3xl font-bold mb-8">My Bookings</h1>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <EmptyState message="No upcoming bookings. Start planning your next trip!" />
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <EmptyState message="No past bookings yet." />
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              <div className="space-y-4">
                {cancelledBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <EmptyState message="No cancelled bookings." />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
