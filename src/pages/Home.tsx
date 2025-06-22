import React from 'react';
import { mockPlaylists, mockAlbums, mockGenres, mockTracks } from '../data/mockData';
import PlaylistCard from '../components/UI/PlaylistCard';
import AlbumCard from '../components/UI/AlbumCard';
import GenreCard from '../components/UI/GenreCard';
import TrackCard from '../components/UI/TrackCard';

const Home = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <div className="spotify-gradient rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Spotify 2.0</h1>
        <p className="text-xl text-white/80 mb-6">
          Discover your next favorite song, artist, or playlist
        </p>
        <button className="bg-spotify-green text-spotify-black px-8 py-3 rounded-full font-semibold hover:bg-spotify-green/90 transition-colors">
          Start Listening
        </button>
      </div>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
          <button className="text-spotify-lightGray hover:text-white text-sm font-medium">
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* Recent Albums */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Albums</h2>
          <button className="text-spotify-lightGray hover:text-white text-sm font-medium">
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Browse by Genre */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
          <button className="text-spotify-lightGray hover:text-white text-sm font-medium">
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockGenres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      {/* Recent Tracks */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Tracks</h2>
          <button className="text-spotify-lightGray hover:text-white text-sm font-medium">
            See All
          </button>
        </div>
        <div className="bg-spotify-gray/20 rounded-lg p-4">
          {mockTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 