import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { mockTracks, mockAlbums, mockArtists, mockPlaylists } from '../data/mockData';
import TrackCard from '../components/UI/TrackCard';
import AlbumCard from '../components/UI/AlbumCard';
import PlaylistCard from '../components/UI/PlaylistCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tracks' | 'albums' | 'artists' | 'playlists'>('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'playlists', label: 'Playlists' },
  ];

  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // Update search query when URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery || '');
    }
  }, [searchParams]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { tracks: [], albums: [], artists: [], playlists: [] };

    const query = searchQuery.toLowerCase();
    
    const tracks = mockTracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query) ||
      track.genre.toLowerCase().includes(query)
    );

    const albums = mockAlbums.filter(album =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query) ||
      album.genre.toLowerCase().includes(query)
    );

    const artists = mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query)
    );

    const playlists = mockPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(query) ||
      playlist.description.toLowerCase().includes(query) ||
      playlist.createdBy.toLowerCase().includes(query)
    );

    return { tracks, albums, artists, playlists };
  }, [searchQuery]);

  const getFilteredResults = () => {
    switch (activeFilter) {
      case 'tracks':
        return searchResults.tracks;
      case 'albums':
        return searchResults.albums;
      case 'artists':
        return searchResults.artists;
      case 'playlists':
        return searchResults.playlists;
      default:
        return {
          tracks: searchResults.tracks,
          albums: searchResults.albums,
          artists: searchResults.artists,
          playlists: searchResults.playlists,
        };
    }
  };

  const results = getFilteredResults();
  const hasResults = searchQuery && (
    searchResults.tracks.length > 0 ||
    searchResults.albums.length > 0 ||
    searchResults.artists.length > 0 ||
    searchResults.playlists.length > 0
  );

  const totalResults = searchResults.tracks.length + 
                      searchResults.albums.length + 
                      searchResults.artists.length + 
                      searchResults.playlists.length;

  return (
    <div className="p-8 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Search</h1>
        
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-spotify-lightGray" size={20} />
          <input
            type="text"
            placeholder="Search for songs, artists, albums, or playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-spotify-gray rounded-full text-white placeholder-spotify-lightGray focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-spotify-lightGray">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-spotify-lightGray" />
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-spotify-green text-spotify-black'
                    : 'bg-spotify-gray text-spotify-lightGray hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {!searchQuery && (
        <div className="text-center py-12">
          <SearchIcon size={64} className="text-spotify-lightGray mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Search for your favorite music</h2>
          <p className="text-spotify-lightGray">Find tracks, albums, artists, and playlists</p>
        </div>
      )}

      {searchQuery && !hasResults && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">No results found</h2>
          <p className="text-spotify-lightGray">Try searching for something else</p>
        </div>
      )}

      {hasResults && (
        <div className="space-y-8">
          {/* All Results */}
          {activeFilter === 'all' && (
            <>
              {searchResults.tracks.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Tracks ({searchResults.tracks.length})</h2>
                  <div className="bg-spotify-gray/20 rounded-lg p-4">
                    {searchResults.tracks.map((track) => (
                      <TrackCard key={track.id} track={track} />
                    ))}
                  </div>
                </section>
              )}

              {searchResults.albums.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Albums ({searchResults.albums.length})</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.albums.map((album) => (
                      <AlbumCard key={album.id} album={album} />
                    ))}
                  </div>
                </section>
              )}

              {searchResults.playlists.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Playlists ({searchResults.playlists.length})</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.playlists.map((playlist) => (
                      <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                  </div>
                </section>
              )}

              {searchResults.artists.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4">Artists ({searchResults.artists.length})</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.artists.map((artist) => (
                      <div key={artist.id} className="bg-spotify-gray/20 p-4 rounded-lg text-center">
                        <img 
                          src={artist.image} 
                          alt={artist.name}
                          className="w-full aspect-square object-cover rounded-full mb-4"
                        />
                        <h3 className="font-semibold text-white">{artist.name}</h3>
                        <p className="text-sm text-spotify-lightGray">
                          {artist.followers.toLocaleString()} followers
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Filtered Results */}
          {activeFilter !== 'all' && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 capitalize">{activeFilter} ({Array.isArray(results) ? results.length : 0})</h2>
              {activeFilter === 'tracks' && (
                <div className="bg-spotify-gray/20 rounded-lg p-4">
                  {results.map((track: any) => (
                    <TrackCard key={track.id} track={track} />
                  ))}
                </div>
              )}
              {activeFilter === 'albums' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {results.map((album: any) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              )}
              {activeFilter === 'playlists' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {results.map((playlist: any) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              )}
              {activeFilter === 'artists' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {results.map((artist: any) => (
                    <div key={artist.id} className="bg-spotify-gray/20 p-4 rounded-lg text-center">
                      <img 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full mb-4"
                      />
                      <h3 className="font-semibold text-white">{artist.name}</h3>
                      <p className="text-sm text-spotify-lightGray">
                        {artist.followers.toLocaleString()} followers
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Search; 