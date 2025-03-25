
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Film, User, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSearch(false);
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Movies', path: '/movies' },
    { title: 'New Releases', path: '/movies?sort=latest' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'bg-background/90 backdrop-blur-md py-3 shadow-md' : 'bg-gradient-to-b from-background/80 to-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl">
            <Film className="w-6 h-6" />
            <span className="font-display">MovieLinkBD</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                )}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {showSearch ? (
            <SearchBar 
              onSearch={handleSearch} 
              className="animate-fade-in" 
              placeholder="Search for movies..."
            />
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(true)}
              className="animate-fade-in"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          )}
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-9 w-9 p-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex md:hidden items-center gap-4">
          {showSearch ? (
            <SearchBar 
              onSearch={handleSearch} 
              className="absolute inset-x-0 top-0 p-4 bg-background z-50 animate-fade-in" 
              placeholder="Search for movies..."
            />
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(true)}
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-md z-40 animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    'px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
            
            <div className="pt-4 mt-4 border-t border-border">
              <Button asChild className="w-full gap-2 justify-center">
                <Link to="/admin">
                  <User className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
