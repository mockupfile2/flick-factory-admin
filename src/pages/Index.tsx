
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeaturedMovie from '@/components/FeaturedMovie';
import MovieCard from '@/components/MovieCard';
import LoadingLogo from '@/components/LoadingLogo';
import { Movie } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // In a real app, this would be an API call
      setFeaturedMovie(mockMovies[0]);
      setRecentMovies(mockMovies.slice(1, 7));
      setPopularMovies(mockMovies.slice(7, 13));
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

      {/* Recent Movies Section */}
      <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold">Recent Releases</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/movies" className="flex items-center gap-2">
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
    </div>
  );
};

export default Index;
