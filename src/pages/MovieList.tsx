
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingLogo from '@/components/LoadingLogo';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { Movie } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';

const MovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const genre = searchParams.get('genre') || 'all';
  const sort = searchParams.get('sort') || 'latest';
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    
    let results = [...movies];
    
    // Filter by genre
    if (genre !== 'all') {
      results = results.filter(movie => movie.genre.includes(genre));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.genre.some(g => g.toLowerCase().includes(query))
      );
    }
    
    // Sort
    switch (sort) {
      case 'latest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'rating':
        results.sort((a, b) => {
          const ratingA = a.imdbRating ? parseFloat(a.imdbRating) : 0;
          const ratingB = b.imdbRating ? parseFloat(b.imdbRating) : 0;
          return ratingB - ratingA;
        });
        break;
      case 'title-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredMovies(results);
  }, [movies, genre, sort, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGenreChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('genre', value);
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSearchParams(params);
  };

  const allGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingLogo size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-display font-bold">Movies Collection</h1>
            <SearchBar onSearch={handleSearch} className="md:w-72" />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <Tabs defaultValue={genre === 'all' ? 'all' : genre} className="w-full lg:w-auto" onValueChange={handleGenreChange}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 lg:flex lg:flex-wrap h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Action">Action</TabsTrigger>
                <TabsTrigger value="Comedy">Comedy</TabsTrigger>
                <TabsTrigger value="Drama">Drama</TabsTrigger>
                <TabsTrigger value="Horror">Horror</TabsTrigger>
                <TabsTrigger value="Sci-Fi">Sci-Fi</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2 lg:ml-auto">
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    {sort === 'title-asc' || sort === 'oldest' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    <span>Sort By</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {filteredMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-xl text-muted-foreground">No movies found</p>
              <Button variant="link" onClick={() => {
                setSearchQuery('');
                setSearchParams(new URLSearchParams([['genre', 'all'], ['sort', 'latest']]));
              }}>
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
