
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        <div className={cn("loading-spinner", sizeClasses[size])} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "text-primary font-bold animate-pulse-opacity",
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          )}>
            M
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingLogo;
