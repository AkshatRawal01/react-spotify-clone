import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Genre } from '../../data/mockData';

interface GenreCardProps {
  genre: Genre;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  return (
    <Link to={`/genre/${genre.id}`}>
      <div 
        className="relative h-32 rounded-lg overflow-hidden group cursor-pointer"
        style={{ backgroundColor: genre.color }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {genre.name}
            </h3>
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play size={16} className="text-white" />
            </button>
          </div>
          
          <div className="text-white/80 text-sm">
            {genre.tracks.length} tracks
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GenreCard; 