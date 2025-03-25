
import { cn } from "@/lib/utils";
import { Film } from "lucide-react";

interface LoadingLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingLogo = ({ size = 'md', className }: LoadingLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        <div className={cn("loading-spinner", sizeClasses[size])} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className={cn(
            "text-primary animate-pulse",
            iconSizes[size]
          )} />
        </div>
      </div>
    </div>
  );
};

export default LoadingLogo;
