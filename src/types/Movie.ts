
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  year: number;
  genre: string[];
  language: string;
  quality: string;
  runtime?: string;
  imdbRating?: string;
  description: string;
  downloadLinks: DownloadLink[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadLink {
  id: string;
  quality: string;
  size: string;
  url: string;
}

export type MovieFormData = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;
