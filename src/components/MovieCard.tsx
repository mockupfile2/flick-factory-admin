
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/Movie';
import { Eye, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  featured?: boolean;
}

const MovieCard = ({ movie, className, featured = false }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={cn(
      'movie-card rounded-xl overflow-hidden group',
      featured ? 'aspect-[16/9]' : 'aspect-[2/3]',
      className
    )}>
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="loading-spinner w-8 h-8" />
          </div>
        )}
        <img
          src={featured ? (movie.backdropUrl || movie.posterUrl) : movie.posterUrl}
          alt={movie.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            featured ? 'object-cover' : 'object-cover'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-300 group-hover:translate-y-0">
          <div className="space-y-1">
            {featured ? (
              <h2 className="text-white text-2xl font-display font-bold tracking-tight line-clamp-1">
                {movie.title}
              </h2>
            ) : (
              <h3 className="text-white text-base font-medium line-clamp-1">
                {movie.title}
              </h3>
            )}
            
            <div className="flex items-center gap-2 opacity-90">
              <Badge variant="outline" className="bg-white/10 text-white text-xs">
                {movie.year}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white text-xs">
                {movie.quality}
              </Badge>
            </div>
          </div>
          
          {featured && (
            <p className="text-white/80 text-sm mt-2 line-clamp-2">
              {movie.description}
            </p>
          )}
        </div>
        
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          <Badge className="bg-primary text-white text-xs px-2 py-1">
            {movie.language}
          </Badge>
        </div>
        
        <div className="absolute top-3 left-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/movie/${movie.id}`} className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Eye className="w-4 h-4 text-white" />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
