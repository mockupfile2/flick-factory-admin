
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/Movie';
import { Play, Download, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoadingLogo from './LoadingLogo';

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[21/9] overflow-hidden rounded-xl">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <LoadingLogo size="lg" showText={true} />
        </div>
      )}
      
      <img 
        src={movie.backdropUrl || movie.posterUrl} 
        alt={movie.title}
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/60 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12 z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.slice(0, 4).map((genre) => (
              <Badge key={genre} variant="secondary" className="bg-white/10 text-white backdrop-blur-sm">
                {genre}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-white/80 mb-4">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.language}</span>
            <span>•</span>
            <span>{movie.quality}</span>
            {movie.imdbRating && (
              <span className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.imdbRating}</span>
              </span>
            )}
          </div>
          
          <p className="text-white/90 text-base md:text-lg max-w-2xl line-clamp-2 md:line-clamp-3 mb-6">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Now</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Info className="w-5 h-5" />
                <span>Details</span>
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 gap-2">
              <Download className="w-5 h-5" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
