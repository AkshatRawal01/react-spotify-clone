import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  Heart
} from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

const PlayerControls = () => {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime,
    duration,
    volume,
    play, 
    pause, 
    resume, 
    nextTrack, 
    previousTrack,
    setVolume,
    seekTo
  } = usePlayer();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      if (currentTrack) {
        resume();
      }
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value / 100);
  };

  const handleMute = () => {
    setVolume(volume > 0 ? 0 : 0.5);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-20 bg-spotify-black border-t border-spotify-gray flex items-center justify-between px-4">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/3">
        {currentTrack ? (
          <>
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <p className="text-sm font-medium text-white">{currentTrack.title}</p>
              <p className="text-xs text-spotify-lightGray">{currentTrack.artist}</p>
            </div>
            <button className="text-spotify-lightGray hover:text-spotify-green transition-colors">
              <Heart size={16} />
            </button>
          </>
        ) : (
          <div className="text-spotify-lightGray text-sm">No track playing</div>
        )}
      </div>

      {/* Main Controls */}
      <div className="flex flex-col items-center space-y-2 w-1/3">
        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => previousTrack()}
            className="text-spotify-lightGray hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={handlePlayPause}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={16} className="text-spotify-black" /> : <Play size={16} className="text-spotify-black" />}
          </button>
          <button 
            onClick={() => nextTrack()}
            className="text-spotify-lightGray hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-spotify-lightGray w-10">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 bg-spotify-gray rounded-full h-1 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-white h-1 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs text-spotify-lightGray w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center space-x-2 w-1/3 justify-end">
        <button 
          onClick={handleMute}
          className="text-spotify-lightGray hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <div className="w-24 bg-spotify-gray rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default PlayerControls; 