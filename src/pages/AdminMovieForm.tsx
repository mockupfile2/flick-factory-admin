
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, X, Plus, Trash2, ArrowLeft, 
  Upload, Film, DownloadCloud 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import LoadingLogo from '@/components/LoadingLogo';
import { Movie, DownloadLink, MovieFormData } from '@/types/Movie';
import { mockMovies } from '@/data/mockMovies';

const AdminMovieForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    posterUrl: '',
    backdropUrl: '',
    year: new Date().getFullYear(),
    genre: [],
    language: '',
    quality: '',
    runtime: '',
    imdbRating: '',
    description: '',
    downloadLinks: [],
    isPublished: false
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulate loading data
      const timer = setTimeout(() => {
        // In a real app, this would be an API call to get movie by id
        const movie = mockMovies.find(m => m.id === id);
        
        if (movie) {
          // Omit id, createdAt, and updatedAt for the form
          const { id: _, createdAt: __, updatedAt: ___, ...formValues } = movie;
          setFormData(formValues as MovieFormData);
        }
        
        setLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const genreArray = value.split(',').map(g => g.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, genre: genreArray }));
  };

  const handlePublishedChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  const addDownloadLink = () => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: [
        ...prev.downloadLinks,
        { id: `temp-${Date.now()}`, quality: '', size: '', url: '' }
      ]
    }));
  };

  const removeDownloadLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks.filter((_, i) => i !== index)
    }));
  };

  const updateDownloadLink = (index: number, field: keyof DownloadLink, value: string) => {
    setFormData(prev => {
      const newLinks = [...prev.downloadLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, downloadLinks: newLinks };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to save the movie
      console.log('Saving movie:', formData);
      
      toast.success(
        isEditMode ? 'Movie updated successfully' : 'Movie created successfully',
        { duration: 3000 }
      );
      
      navigate('/admin');
      setSubmitting(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingLogo size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading movie data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            
            <h1 className="text-3xl font-display font-bold flex items-center gap-2">
              <Film className="text-primary" />
              {isEditMode ? 'Edit Movie' : 'Add New Movie'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            
            <Button
              type="submit"
              form="movie-form"
              disabled={submitting}
              className="gap-2"
            >
              {submitting ? (
                <>
                  <LoadingLogo size="sm" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Movie</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <form id="movie-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Movie Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter movie title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Release Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="Enter release year"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genres (comma separated)</Label>
                <Input
                  id="genre"
                  name="genre"
                  placeholder="Action, Drama, Thriller"
                  value={formData.genre.join(', ')}
                  onChange={handleGenreChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleSelectChange('language', value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quality">Quality</Label>
                <Select
                  value={formData.quality}
                  onValueChange={(value) => handleSelectChange('quality', value)}
                >
                  <SelectTrigger id="quality">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4K">4K</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="HDRip">HDRip</SelectItem>
                    <SelectItem value="DVDSCR">DVDSCR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="runtime">Runtime (e.g. 2h 15m)</Label>
                <Input
                  id="runtime"
                  name="runtime"
                  placeholder="Enter runtime"
                  value={formData.runtime}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imdbRating">IMDb Rating</Label>
                <Input
                  id="imdbRating"
                  name="imdbRating"
                  placeholder="Enter IMDb rating"
                  value={formData.imdbRating}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter movie description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-medium mb-4">Images</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="posterUrl">Poster URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="posterUrl"
                    name="posterUrl"
                    placeholder="Enter poster URL"
                    value={formData.posterUrl}
                    onChange={handleChange}
                    required
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {formData.posterUrl && (
                  <div className="mt-2 relative w-24 h-36 overflow-hidden rounded-md border">
                    <img 
                      src={formData.posterUrl} 
                      alt="Poster preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backdropUrl">Backdrop URL (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="backdropUrl"
                    name="backdropUrl"
                    placeholder="Enter backdrop URL"
                    value={formData.backdropUrl}
                    onChange={handleChange}
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {formData.backdropUrl && (
                  <div className="mt-2 relative w-48 h-24 overflow-hidden rounded-md border">
                    <img 
                      src={formData.backdropUrl} 
                      alt="Backdrop preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Download Links</h2>
              <Button
                type="button"
                onClick={addDownloadLink}
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Link
              </Button>
            </div>
            
            {formData.downloadLinks.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <DownloadCloud className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No download links added</p>
                <Button 
                  type="button"
                  onClick={addDownloadLink}
                  variant="outline"
                  className="mt-4"
                >
                  Add Download Link
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.downloadLinks.map((link, index) => (
                  <div key={link.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card/50">
                    <div>
                      <Label htmlFor={`link-quality-${index}`}>Quality</Label>
                      <Select
                        value={link.quality}
                        onValueChange={(value) => updateDownloadLink(index, 'quality', value)}
                      >
                        <SelectTrigger id={`link-quality-${index}`}>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4K">4K</SelectItem>
                          <SelectItem value="1080p">1080p</SelectItem>
                          <SelectItem value="720p">720p</SelectItem>
                          <SelectItem value="480p">480p</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`link-size-${index}`}>File Size</Label>
                      <Input
                        id={`link-size-${index}`}
                        placeholder="e.g. 1.2 GB"
                        value={link.size}
                        onChange={(e) => updateDownloadLink(index, 'size', e.target.value)}
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex items-end gap-2">
                      <div className="flex-1">
                        <Label htmlFor={`link-url-${index}`}>Download URL</Label>
                        <Input
                          id={`link-url-${index}`}
                          placeholder="https://example.com/download"
                          value={link.url}
                          onChange={(e) => updateDownloadLink(index, 'url', e.target.value)}
                        />
                      </div>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDownloadLink(index)}
                        className="mb-0.5 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Separator className="my-6" />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-base font-medium">Publishing Status</h2>
                <p className="text-sm text-muted-foreground">
                  {formData.isPublished 
                    ? 'This movie is visible to users'
                    : 'This movie is saved as a draft'}
                </p>
              </div>
              <Switch
                checked={formData.isPublished}
                onCheckedChange={handlePublishedChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMovieForm;
