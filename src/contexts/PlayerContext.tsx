import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { Track } from '../data/mockData';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  queue: Track[];
  addToQueue: (track: Track) => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [queue, setQueue] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Set up event listeners
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
      }
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Auto-play next track if available
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(prev => prev.slice(1));
      play(nextTrack);
    }
  };

  const handleError = (e: Event) => {
    console.error('Audio playback error:', e);
    setIsPlaying(false);
  };

  const play = async (track: Track) => {
    if (!audioRef.current) return;

    try {
      // For demo purposes, we'll use a placeholder audio URL
      // In a real app, you'd use the actual track.url
      const audioUrl = track.url || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      
      audioRef.current.src = audioUrl;
      audioRef.current.currentTime = 0;
      
      setCurrentTrack(track);
      setIsPlaying(true);
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log('Playing:', track.title);
      }
    } catch (error) {
      console.error('Error playing track:', error);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('Paused');
    }
  };

  const resume = async () => {
    if (audioRef.current && currentTrack) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Resumed');
      } catch (error) {
        console.error('Error resuming:', error);
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTrack(null);
      setIsPlaying(false);
      setCurrentTime(0);
      console.log('Stopped');
    }
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(prev => prev.slice(1));
      play(nextTrack);
      console.log('Next track');
    }
  };

  const previousTrack = () => {
    // Implementation for previous track
    console.log('Previous track');
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
    console.log('Added to queue:', track.title);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      currentTime,
      duration,
      volume,
      play, 
      pause, 
      resume, 
      stop, 
      nextTrack, 
      previousTrack, 
      queue, 
      addToQueue,
      setVolume,
      seekTo
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
}; 