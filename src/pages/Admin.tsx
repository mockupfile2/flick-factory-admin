
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Trash2, Edit, Eye, 
  CheckCircle, XCircle, ArrowUpDown, Film
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import LoadingLogo from '@/components/LoadingLogo';
import { Movie } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';

const Admin = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteMovie = (id: string) => {
    // In a real app, this would be an API call
    setMovies(movies.filter(movie => movie.id !== id));
    toast.success('Movie deleted successfully');
  };

  const handleTogglePublish = (id: string) => {
    // In a real app, this would be an API call
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, isPublished: !movie.isPublished } : movie
    ));
    
    const movie = movies.find(m => m.id === id);
    if (movie) {
      toast.success(`Movie ${movie.isPublished ? 'unpublished' : 'published'} successfully`);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'published') return matchesSearch && movie.isPublished;
    if (currentTab === 'drafts') return matchesSearch && !movie.isPublished;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingLogo size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-2">
              <Film className="text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your movie database
            </p>
          </div>
          
          <Button asChild>
            <Link to="/admin/movie/add" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Movie
            </Link>
          </Button>
        </div>
        
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All Movies</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search movies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      <span>Sort by Title</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      <span>Sort by Date</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          
            <TabsContent value="all" className="m-0">
              <MovieTable 
                movies={filteredMovies} 
                onDelete={handleDeleteMovie}
                onTogglePublish={handleTogglePublish}
              />
            </TabsContent>
            
            <TabsContent value="published" className="m-0">
              <MovieTable 
                movies={filteredMovies} 
                onDelete={handleDeleteMovie}
                onTogglePublish={handleTogglePublish}
              />
            </TabsContent>
            
            <TabsContent value="drafts" className="m-0">
              <MovieTable 
                movies={filteredMovies} 
                onDelete={handleDeleteMovie}
                onTogglePublish={handleTogglePublish}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface MovieTableProps {
  movies: Movie[];
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const MovieTable = ({ movies, onDelete, onTogglePublish }: MovieTableProps) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Movie</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-12 w-8 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {movie.genre.slice(0, 2).join(', ')}
                      {movie.genre.length > 2 && '...'}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{movie.year}</TableCell>
              <TableCell>{movie.quality}</TableCell>
              <TableCell>{movie.language}</TableCell>
              <TableCell>
                {movie.isPublished ? (
                  <Badge variant="default" className="bg-green-500/20 text-green-600 hover:bg-green-500/30">
                    Published
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                    Draft
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link to={`/movie/${movie.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link to={`/admin/movie/edit/${movie.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onTogglePublish(movie.id)}
                  >
                    {movie.isPublished ? (
                      <XCircle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(movie.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
