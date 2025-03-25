
import { Movie } from '@/types/Movie';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Matrix Resurrections',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/eNI7PtK6DEYgZmHWP9gQNuff8pv.jpg',
    year: 2021,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    language: 'English',
    quality: '4K',
    runtime: '2h 28m',
    imdbRating: '5.7',
    description: 'Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a physical or mental construct, Mr. Anderson, aka Neo, will have to choose to follow the white rabbit once more.',
    downloadLinks: [
      { id: 'dl1', quality: '4K', size: '8.5 GB', url: '#' },
      { id: 'dl2', quality: '1080p', size: '2.3 GB', url: '#' },
      { id: 'dl3', quality: '720p', size: '1.1 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-01-15T12:00:00Z'
  },
  {
    id: '2',
    title: 'Dune',
    posterUrl: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
    year: 2021,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English',
    quality: '4K',
    runtime: '2h 35m',
    imdbRating: '8.0',
    description: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.',
    downloadLinks: [
      { id: 'dl4', quality: '4K', size: '9.1 GB', url: '#' },
      { id: 'dl5', quality: '1080p', size: '2.5 GB', url: '#' },
      { id: 'dl6', quality: '720p', size: '1.3 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-02-10T14:30:00Z',
    updatedAt: '2023-02-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Shang-Chi and the Legend of the Ten Rings',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/cinER0ESG0eJ49kXlExM0MEWGxW.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'English',
    quality: '4K',
    runtime: '2h 12m',
    imdbRating: '7.4',
    description: 'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.',
    downloadLinks: [
      { id: 'dl7', quality: '4K', size: '8.2 GB', url: '#' },
      { id: 'dl8', quality: '1080p', size: '2.1 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-03-05T09:15:00Z',
    updatedAt: '2023-03-05T09:15:00Z'
  },
  {
    id: '4',
    title: 'No Time to Die',
    posterUrl: 'https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/BeEYQKamiAzG1O0kJxdcj41CsSK.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Thriller'],
    language: 'English',
    quality: '4K',
    runtime: '2h 43m',
    imdbRating: '7.3',
    description: 'Bond has left active service and is enjoying a tranquil life in Jamaica. His peace is short-lived when his old friend Felix Leiter from the CIA turns up asking for help.',
    downloadLinks: [
      { id: 'dl9', quality: '4K', size: '9.5 GB', url: '#' },
      { id: 'dl10', quality: '1080p', size: '2.4 GB', url: '#' },
      { id: 'dl11', quality: '720p', size: '1.2 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-04-20T16:45:00Z',
    updatedAt: '2023-04-20T16:45:00Z'
  },
  {
    id: '5',
    title: 'Spider-Man: No Way Home',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'English',
    quality: '4K',
    runtime: '2h 28m',
    imdbRating: '8.3',
    description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
    downloadLinks: [
      { id: 'dl12', quality: '4K', size: '8.8 GB', url: '#' },
      { id: 'dl13', quality: '1080p', size: '2.3 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-05-12T11:20:00Z',
    updatedAt: '2023-05-12T11:20:00Z'
  },
  {
    id: '6',
    title: 'Free Guy',
    posterUrl: 'https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
    year: 2021,
    genre: ['Action', 'Comedy', 'Adventure'],
    language: 'English',
    quality: '4K',
    runtime: '1h 55m',
    imdbRating: '7.1',
    description: 'A bank teller discovers that he\'s actually an NPC inside a brutal, open world video game.',
    downloadLinks: [
      { id: 'dl14', quality: '4K', size: '7.9 GB', url: '#' },
      { id: 'dl15', quality: '1080p', size: '2.0 GB', url: '#' },
      { id: 'dl16', quality: '720p', size: '1.0 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-06-08T13:10:00Z',
    updatedAt: '2023-06-08T13:10:00Z'
  },
  {
    id: '7',
    title: 'Black Widow',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Thriller'],
    language: 'English',
    quality: '4K',
    runtime: '2h 14m',
    imdbRating: '6.7',
    description: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.',
    downloadLinks: [
      { id: 'dl17', quality: '4K', size: '8.3 GB', url: '#' },
      { id: 'dl18', quality: '1080p', size: '2.2 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-07-14T10:05:00Z',
    updatedAt: '2023-07-14T10:05:00Z'
  },
  {
    id: '8',
    title: 'The Suicide Squad',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Comedy'],
    language: 'English',
    quality: '1080p',
    runtime: '2h 12m',
    imdbRating: '7.2',
    description: 'Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.',
    downloadLinks: [
      { id: 'dl19', quality: '1080p', size: '2.3 GB', url: '#' },
      { id: 'dl20', quality: '720p', size: '1.2 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-08-01T17:30:00Z',
    updatedAt: '2023-08-01T17:30:00Z'
  },
  {
    id: '9',
    title: 'Eternals',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'English',
    quality: '4K',
    runtime: '2h 37m',
    imdbRating: '6.3',
    description: 'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind's most ancient enemy, the Deviants.',
    downloadLinks: [
      { id: 'dl21', quality: '4K', size: '9.2 GB', url: '#' },
      { id: 'dl22', quality: '1080p', size: '2.4 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-09-05T14:50:00Z',
    updatedAt: '2023-09-05T14:50:00Z'
  },
  {
    id: '10',
    title: 'Venom: Let There Be Carnage',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg',
    year: 2021,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    language: 'English',
    quality: '4K',
    runtime: '1h 37m',
    imdbRating: '5.9',
    description: 'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
    downloadLinks: [
      { id: 'dl23', quality: '4K', size: '7.8 GB', url: '#' },
      { id: 'dl24', quality: '1080p', size: '2.0 GB', url: '#' },
      { id: 'dl25', quality: '720p', size: '1.0 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-10-18T09:25:00Z',
    updatedAt: '2023-10-18T09:25:00Z'
  },
  {
    id: '11',
    title: 'Ghostbusters: Afterlife',
    posterUrl: 'https://image.tmdb.org/t/p/w500/sg4xJaufDiQl7nBc2CwwptjAEpK.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/EnDlndEvw6Ptpp8HIwmRcSSNKQ.jpg',
    year: 2021,
    genre: ['Comedy', 'Fantasy', 'Adventure'],
    language: 'English',
    quality: '1080p',
    runtime: '2h 4m',
    imdbRating: '7.1',
    description: 'When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.',
    downloadLinks: [
      { id: 'dl26', quality: '1080p', size: '2.2 GB', url: '#' },
      { id: 'dl27', quality: '720p', size: '1.1 GB', url: '#' }
    ],
    isPublished: true,
    createdAt: '2023-11-07T15:15:00Z',
    updatedAt: '2023-11-07T15:15:00Z'
  },
  {
    id: '12',
    title: 'Encanto',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg',
    year: 2021,
    genre: ['Animation', 'Comedy', 'Family'],
    language: 'English',
    quality: '4K',
    runtime: '1h 42m',
    imdbRating: '7.2',
    description: 'The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto.',
    downloadLinks: [
      { id: 'dl28', quality: '4K', size: '7.5 GB', url: '#' },
      { id: 'dl29', quality: '1080p', size: '1.9 GB', url: '#' }
    ],
    isPublished: false,
    createdAt: '2023-12-03T12:40:00Z',
    updatedAt: '2023-12-03T12:40:00Z'
  },
  {
    id: '13',
    title: 'The King\'s Man',
    posterUrl: 'https://image.tmdb.org/t/p/w500/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/4OTYefcAlaShn6TGVK33UxLW9R7.jpg',
    year: 2021,
    genre: ['Action', 'Adventure', 'Thriller'],
    language: 'English',
    quality: '1080p',
    runtime: '2h 11m',
    imdbRating: '6.3',
    description: 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.',
    downloadLinks: [
      { id: 'dl30', quality: '1080p', size: '2.3 GB', url: '#' },
      { id: 'dl31', quality: '720p', size: '1.2 GB', url: '#' }
    ],
    isPublished: false,
    createdAt: '2024-01-09T10:55:00Z',
    updatedAt: '2024-01-09T10:55:00Z'
  }
];
