import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HotelCard } from '@/components/hotels/HotelCard';
import { SearchBox } from '@/components/hotels/SearchBox';
import { searchHotels, amenities, propertyTypes } from '@/lib/mock-data';
import { Hotel } from '@/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal, Star, X } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const city = searchParams.get('city') || '';

  // Filter hotels
  const hotels = searchHotels({
    city,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    rating: minRating,
    amenities: selectedAmenities,
    sortBy,
  });

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1500]);
    setMinRating(0);
    setSelectedAmenities([]);
    setSortBy('');
  };

  const activeFiltersCount =
    (priceRange[0] > 0 || priceRange[1] < 1500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedAmenities.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={1500}
          step={50}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMinRating(rating)}
              className="gap-1"
            >
              {rating === 0 ? (
                'Any'
              ) : (
                <>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {rating}+
                </>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">Amenities</h3>
        <div className="grid grid-cols-2 gap-3">
          {amenities.slice(0, 8).map((amenity) => (
            <div key={amenity.id} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${amenity.id}`}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={() => toggleAmenity(amenity.id)}
              />
              <label
                htmlFor={`amenity-${amenity.id}`}
                className="text-sm cursor-pointer"
              >
                {amenity.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="bg-muted/50 py-6 border-b border-border">
        <div className="container-app">
          <SearchBox variant="compact" />
        </div>
      </div>

      <div className="container-app py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6 p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount} active</Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {city ? `Hotels in ${city}` : 'All Hotels'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {hotels.length} {hotels.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                  <Badge variant="secondary" className="gap-1">
                    ${priceRange[0]} - ${priceRange[1]}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setPriceRange([0, 1500])}
                    />
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {minRating}+ stars
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setMinRating(0)}
                    />
                  </Badge>
                )}
                {selectedAmenities.map((id) => {
                  const amenity = amenities.find((a) => a.id === id);
                  return amenity ? (
                    <Badge key={id} variant="secondary" className="gap-1">
                      {amenity.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleAmenity(id)}
                      />
                    </Badge>
                  ) : null;
                })}
              </div>
            )}

            {/* Results Grid */}
            {hotels.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No hotels found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
