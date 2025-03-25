
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/Movie';
import { Eye, Download, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import LoadingLogo from './LoadingLogo';

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
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
            <LoadingLogo size="sm" />
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
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-300 translate-y-0">
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
              {movie.imdbRating && (
                <div className="flex items-center bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded">
                  <Star className="w-3 h-3 mr-0.5" />
                  {movie.imdbRating}
                </div>
              )}
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
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/movie/${movie.id}`} className="p-3 rounded-full bg-primary hover:bg-primary/90 text-white backdrop-blur-sm transition-colors">
                  <Eye className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/movie/${movie.id}`} className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors">
                  <Download className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
