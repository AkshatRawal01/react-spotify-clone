import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-spotify-dark/80 backdrop-blur-md border-b border-spotify-gray/20 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-lightGray" size={20} />
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-spotify-gray rounded-full text-white placeholder-spotify-lightGray focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
        </form>
      </div>

      {/* User Controls */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-spotify-lightGray hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <button className="flex items-center space-x-2 bg-spotify-gray hover:bg-spotify-gray/80 px-3 py-2 rounded-full transition-colors">
          <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center">
            <User size={14} className="text-spotify-black" />
          </div>
          <span className="text-sm font-medium">User</span>
        </button>
      </div>
    </header>
  );
};

export default Header; 