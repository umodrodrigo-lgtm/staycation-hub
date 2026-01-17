import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SearchBox } from '@/components/hotels/SearchBox';
import { HotelCard } from '@/components/hotels/HotelCard';
import { hotels, cities } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Star, Shield, Clock, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredHotels = hotels.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="container-app relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-secondary-light">Stay Anywhere</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl animate-slide-up">
              Discover and book amazing hotels at the best prices. From luxury resorts to cozy boutiques, we have it all.
            </p>
          </div>
          <div className="mt-8 max-w-4xl animate-slide-up">
            <SearchBox variant="hero" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container-app">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it' },
              { icon: Clock, title: 'Free Cancellation', desc: 'On most bookings, cancel for free' },
              { icon: Star, title: '24/7 Support', desc: 'We\'re here to help anytime' },
              { icon: Award, title: 'Verified Reviews', desc: 'Real reviews from real guests' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container-app">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.slice(0, 5).map((city) => (
              <Link key={city} to={`/search?city=${encodeURIComponent(city)}`} className="group relative h-40 rounded-xl overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop`} alt={city} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display font-semibold text-lg">{city}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-muted/30">
        <div className="container-app">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Featured Hotels</h2>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/search">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="container-app text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Book Your Stay?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Join thousands of travelers who trust StayEase for their accommodation needs.</p>
          <Button asChild variant="coral" size="xl">
            <Link to="/search">Start Searching</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
