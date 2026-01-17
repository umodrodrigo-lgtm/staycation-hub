import { Room } from '@/types';
import { Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoomCardProps {
  room: Room;
  nights?: number;
  onSelect: (room: Room) => void;
}

export function RoomCard({ room, nights = 1, onSelect }: RoomCardProps) {
  const totalPrice = room.pricePerNight * nights;

  const getRoomTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      standard: 'bg-muted text-muted-foreground',
      deluxe: 'bg-primary/10 text-primary',
      suite: 'bg-accent/10 text-accent',
      premium: 'bg-secondary/10 text-secondary',
    };
    return variants[type] || variants.standard;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-card transition-shadow">
      {/* Room Image */}
      <div className="w-full md:w-48 h-36 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={room.images[0]?.imageUrl || '/placeholder.svg'}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {room.name}
              </h3>
              <Badge className={`mt-1 ${getRoomTypeBadge(room.roomType)}`}>
                {room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Users className="h-4 w-4" />
              <span>Up to {room.capacity} guests</span>
            </div>
          </div>

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities.slice(0, 4).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-success" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">${room.pricePerNight}</span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
            {nights > 1 && (
              <p className="text-sm text-muted-foreground">
                ${totalPrice} total for {nights} nights
              </p>
            )}
          </div>
          <Button variant="gradient" onClick={() => onSelect(room)}>
            Select Room
          </Button>
        </div>
      </div>
    </div>
  );
}
