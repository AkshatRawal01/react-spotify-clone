import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '../../data/mockData';
import { usePlayer } from '../../contexts/PlayerContext';

interface TrackCardProps {
  track: Track;
  showAlbum?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, showAlbum = true }) => {
  const { currentTrack, isPlaying, play, pause } = usePlayer();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pause();
      } else {
        play(track);
      }
    } else {
      play(track);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group flex items-center space-x-4 p-3 rounded-md hover:bg-spotify-gray/50 transition-colors">
      {/* Cover Image */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <img 
          src={track.cover} 
          alt={track.title}
          className="w-full h-full object-cover rounded"
        />
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 bg-black/50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isCurrentlyPlaying ? (
            <Pause size={16} className="text-white" />
          ) : (
            <Play size={16} className="text-white" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          isCurrentTrack ? 'text-spotify-green' : 'text-white'
        }`}>
          {track.title}
        </p>
        <p className="text-xs text-spotify-lightGray truncate">
          {track.artist}
          {showAlbum && ` • ${track.album}`}
        </p>
      </div>

      {/* Duration */}
      <div className="text-xs text-spotify-lightGray flex-shrink-0">
        {formatDuration(track.duration)}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-spotify-lightGray hover:text-spotify-green transition-colors">
          <Heart size={16} />
        </button>
        <button className="text-spotify-lightGray hover:text-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackCard; 