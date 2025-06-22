export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  cover: string;
  duration: number;
  genre: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  tracks: Track[];
  year: number;
  genre: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  albums: Album[];
  topTracks: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  tracks: Track[];
  createdBy: string;
  followers: number;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  tracks: Track[];
}

// Mock Tracks with real audio URLs
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 200,
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    duration: 210,
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: 234,
    genre: 'Pop'
  },
  {
    id: '4',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 270,
    genre: 'Funk'
  },
  {
    id: '5',
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    album: 'Vida',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    duration: 229,
    genre: 'Latin'
  },
  {
    id: '6',
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: 285,
    genre: 'Pop'
  }
];

// Mock Albums
export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(0, 3),
    year: 2020,
    genre: 'Pop'
  },
  {
    id: '2',
    title: 'The Kids Are Coming',
    artist: 'Tones and I',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(1, 4),
    year: 2019,
    genre: 'Pop'
  },
  {
    id: '3',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(2, 5),
    year: 2017,
    genre: 'Pop'
  }
];

// Mock Artists
export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: 45000000,
    albums: mockAlbums.slice(0, 1),
    topTracks: mockTracks.slice(0, 3)
  },
  {
    id: '2',
    name: 'Ed Sheeran',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    followers: 38000000,
    albums: mockAlbums.slice(2, 3),
    topTracks: mockTracks.slice(2, 5)
  },
  {
    id: '3',
    name: 'Adele',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    followers: 42000000,
    albums: [],
    topTracks: mockTracks.slice(5, 6)
  }
];

// Mock Playlists
export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now.',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(0, 4),
    createdBy: 'Spotify',
    followers: 35000000
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Relaxing music for your day.',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(1, 5),
    createdBy: 'User',
    followers: 1200000
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'High energy tracks for your workout.',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    tracks: mockTracks.slice(2, 6),
    createdBy: 'Spotify',
    followers: 8500000
  }
];

// Mock Genres
export const mockGenres: Genre[] = [
  {
    id: '1',
    name: 'Pop',
    color: '#1DB954',
    tracks: mockTracks.filter(track => track.genre === 'Pop')
  },
  {
    id: '2',
    name: 'Rock',
    color: '#E61E32',
    tracks: []
  },
  {
    id: '3',
    name: 'Hip Hop',
    color: '#FF6B35',
    tracks: []
  },
  {
    id: '4',
    name: 'Electronic',
    color: '#9B59B6',
    tracks: []
  },
  {
    id: '5',
    name: 'Jazz',
    color: '#F39C12',
    tracks: []
  },
  {
    id: '6',
    name: 'Classical',
    color: '#3498DB',
    tracks: []
  }
]; 