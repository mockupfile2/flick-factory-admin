
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, Calendar, Clock, Film, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LoadingLogo from '@/components/LoadingLogo';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';
import { toast } from "@/hooks/use-toast";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // In a real app, this would be an API call to get movie by id
      const foundMovie = mockMovies.find(m => m.id === id) || mockMovies[0];
      setMovie(foundMovie);
      
      // Get related movies by genre
      const related = mockMovies
        .filter(m => m.id !== foundMovie.id && m.genre.some(g => foundMovie.genre.includes(g)))
        .slice(0, 6);
      
      setRelatedMovies(related);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie?.title || 'Movie',
        text: `Check out ${movie?.title}!`,
        url: window.location.href
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Movie link copied to clipboard",
    });
  };

  if (loading || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingLogo size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-16">
      {/* Backdrop */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={movie.backdropUrl || movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <Button 
          variant="ghost" 
          asChild
          className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full"
        >
          <Link to="/">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:gap-8 -mt-32 md:-mt-40 relative z-10">
          {/* Movie Poster */}
          <div className="w-48 md:w-72 flex-shrink-0 mx-auto md:mx-0">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="flex-1 mt-6 md:mt-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-primary/10 text-primary">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-3 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{movie.year}</span>
              </div>
              
              {movie.runtime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movie.runtime}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Film className="w-4 h-4 mr-1" />
                <span>{movie.language}</span>
              </div>
              
              <div className="flex items-center">
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-sm">
                  {movie.quality}
                </span>
              </div>
              
              {movie.imdbRating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{movie.imdbRating}</span>
                </div>
              )}
            </div>
            
            <Separator className="my-6 bg-border/50" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Synopsis</h3>
              <p className="text-muted-foreground">
                {movie.description}
              </p>
            </div>
            
            <Separator className="my-6 bg-border/50" />
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Download Links</h3>
              
              <div className="space-y-3">
                {movie.downloadLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-card hover:bg-card/80 border border-border/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{link.quality} Quality</p>
                        <p className="text-sm text-muted-foreground">{link.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="default">
                      Download
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <Button 
                className="gap-2" 
                size="lg" 
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {relatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
