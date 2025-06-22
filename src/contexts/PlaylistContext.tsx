import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  cover: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlaylistContextType {
  playlists: Playlist[];
  addPlaylist: (playlist: Playlist) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists((prev) => [...prev, playlist]);
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId ? { ...pl, tracks: [...pl.tracks, track] } : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, addPlaylist, addTrackToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error('usePlaylist must be used within a PlaylistProvider');
  return context;
}; 