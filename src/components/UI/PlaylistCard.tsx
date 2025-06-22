import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Playlist } from '../../data/mockData';
import { usePlayer } from '../../contexts/PlayerContext';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const { play } = usePlayer();

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  const handlePlayPlaylist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      play(playlist.tracks[0]);
      console.log('Playing playlist:', playlist.name);
    }
  };

  return (
    <div className="group bg-spotify-gray/20 p-4 rounded-lg hover:bg-spotify-gray/30 transition-all duration-300 hover-effect">
      {/* Playlist Cover */}
      <div className="relative mb-4">
        <img 
          src={playlist.cover} 
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePlayPlaylist}
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

      {/* Playlist Info */}
      <Link to={`/playlist/${playlist.id}`} className="block">
        <h3 className="font-semibold text-white truncate group-hover:text-spotify-green transition-colors">
          {playlist.name}
        </h3>
        <p className="text-sm text-spotify-lightGray line-clamp-2 mt-1">
          {playlist.description}
        </p>
        <p className="text-xs text-spotify-lightGray mt-2">
          {playlist.tracks.length} tracks • {formatFollowers(playlist.followers)} followers
        </p>
        <p className="text-xs text-spotify-lightGray">
          By {playlist.createdBy}
        </p>
      </Link>
    </div>
  );
};

export default PlaylistCard; 