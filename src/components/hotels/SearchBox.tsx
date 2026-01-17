import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  variant?: 'hero' | 'compact';
  onSearch?: (params: {
    city: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
    rooms: number;
  }) => void;
}

export function SearchBox({ variant = 'hero', onSearch }: SearchBoxProps) {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'));
    params.set('guests', guests.toString());
    params.set('rooms', rooms.toString());

    if (onSearch) {
      onSearch({ city, checkIn, checkOut, guests, rooms });
    } else {
      navigate(`/search?${params.toString()}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={cn(
        'rounded-2xl bg-card p-4',
        isHero ? 'shadow-xl border border-border/50' : 'shadow-card border border-border'
      )}
    >
      <div
        className={cn(
          'grid gap-4',
          isHero
            ? 'md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]'
            : 'sm:grid-cols-2 lg:grid-cols-5'
        )}
      >
        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="input-search border-0 bg-muted/50 h-11">
              <SelectValue placeholder="Where are you going?" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                  'w-full justify-start text-left font-normal h-11 border-0 bg-muted/50',
                  !checkIn && 'text-muted-foreground'
                )}
              >
                {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Add date'}
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
                  'w-full justify-start text-left font-normal h-11 border-0 bg-muted/50',
                  !checkOut && 'text-muted-foreground'
                )}
              >
                {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Add date'}
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

        {/* Guests */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            Guests & Rooms
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-11 border-0 bg-muted/50"
              >
                {guests} guests, {rooms} room{rooms > 1 ? 's' : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Guests</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rooms</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(Math.min(5, rooms + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className={cn('flex items-end', isHero && 'lg:col-span-1')}>
          <Button
            onClick={handleSearch}
            variant="coral"
            size={isHero ? 'lg' : 'default'}
            className={cn('w-full gap-2', isHero && 'h-11')}
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
