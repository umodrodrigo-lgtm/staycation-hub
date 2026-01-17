import { Link } from 'react-router-dom';
import { Hotel } from '@/types';
import { Star, MapPin, Wifi, Car, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const getAmenityIcon = (name: string) => {
    if (name.toLowerCase().includes('wifi')) return <Wifi className="h-3.5 w-3.5" />;
    if (name.toLowerCase().includes('pool')) return <Waves className="h-3.5 w-3.5" />;
    if (name.toLowerCase().includes('parking')) return <Car className="h-3.5 w-3.5" />;
    return null;
  };

  return (
    <Link to={`/hotel/${hotel.id}`} className="block group">
      <div className="card-elevated overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.mainImage}
            alt={hotel.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-baseline gap-1 text-white">
              <span className="text-2xl font-bold">${hotel.lowestPrice}</span>
              <span className="text-sm opacity-80">/ night</span>
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/95 text-foreground backdrop-blur-sm gap-1 font-medium">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              {hotel.rating}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {hotel.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{hotel.city}</span>
              <span className="mx-1">•</span>
              <span>{hotel.reviewCount} reviews</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <Badge
                key={amenity.id}
                variant="secondary"
                className="gap-1 text-xs font-normal"
              >
                {getAmenityIcon(amenity.name)}
                {amenity.name}
              </Badge>
            ))}
            {hotel.amenities.length > 4 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>

          {/* CTA */}
          <Button variant="gradient" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}
