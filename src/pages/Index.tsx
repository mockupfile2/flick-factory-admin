
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeaturedMovie from '@/components/FeaturedMovie';
import MovieCard from '@/components/MovieCard';
import LoadingLogo from '@/components/LoadingLogo';
import { Movie } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // In a real app, this would be an API call
      setFeaturedMovie(mockMovies[0]);
      setRecentMovies(mockMovies.slice(1, 7));
      setPopularMovies(mockMovies.slice(7, 13));
      setTrendingMovies(mockMovies.slice(3, 9).reverse());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingLogo size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading amazing movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero section with featured movie */}
      <section className="pt-16">
        {featuredMovie && <FeaturedMovie movie={featuredMovie} />}
      </section>

      {/* Welcome Banner */}
      <section className="mt-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-accent/50 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Welcome to MovieLinkBD</h2>
            <p className="text-foreground/80 max-w-3xl">
              Your ultimate destination for high-quality movie downloads. Browse our vast collection of movies
              across all genres, from latest releases to all-time classics.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="bg-background/50">HD Quality</Badge>
              <Badge variant="outline" className="bg-background/50">Fast Downloads</Badge>
              <Badge variant="outline" className="bg-background/50">Multiple Languages</Badge>
              <Badge variant="outline" className="bg-background/50">All Genres</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Movies Section */}
      <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Recent Releases</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/movies?sort=latest" className="flex items-center gap-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {recentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Trending Now</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/movies?sort=trending" className="flex items-center gap-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Popular Movies</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/movies?sort=popular" className="flex items-center gap-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-display font-bold mb-8 text-center">Why Choose MovieLinkBD?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">HD</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">High Quality</h3>
            <p className="text-muted-foreground">All movies available in HD, Full HD, and even 4K quality for the best viewing experience.</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Downloads</h3>
            <p className="text-muted-foreground">Multiple download servers to ensure maximum speed and availability at all times.</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">🌐</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multi-language</h3>
            <p className="text-muted-foreground">Movies in various languages with subtitles available for international audience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
