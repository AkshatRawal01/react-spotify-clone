import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Album } from '../../data/mockData';
import { usePlayer } from '../../contexts/PlayerContext';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { play } = usePlayer();

  const handlePlayAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (album.tracks.length > 0) {
      play(album.tracks[0]);
      console.log('Playing album:', album.title);
    }
  };

  return (
    <div className="group bg-spotify-gray/20 p-4 rounded-lg hover:bg-spotify-gray/30 transition-all duration-300 hover-effect">
      {/* Album Cover */}
      <div className="relative mb-4">
        <img 
          src={album.cover} 
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePlayAlbum}
              className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Play size={20} className="text-spotify-black ml-1" />
            </button>
            <button className="w-10 h-10 bg-spotify-gray/80 rounded-full flex items-center justify-center hover:bg-spotify-gray transition-colors">
              <Heart size={16} className="text-white" />
            </button>
            <button className="w-10 h-10 bg-spotify-gray/80 rounded-full flex items-center justify-center hover:bg-spotify-gray transition-colors">
              <MoreHorizontal size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Album Info */}
      <Link to={`/album/${album.id}`} className="block">
        <h3 className="font-semibold text-white truncate group-hover:text-spotify-green transition-colors">
          {album.title}
        </h3>
        <p className="text-sm text-spotify-lightGray truncate">
          {album.artist} • {album.year}
        </p>
        <p className="text-xs text-spotify-lightGray mt-1">
          {album.tracks.length} tracks • {album.genre}
        </p>
      </Link>
    </div>
  );
};

export default AlbumCard; 