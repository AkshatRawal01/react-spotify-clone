import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart, 
  Download,
  User,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const playlistItems = [
    { id: '1', name: 'Liked Songs', icon: Heart },
    { id: '2', name: 'My Playlist #1', icon: null },
    { id: '3', name: 'Discover Weekly', icon: null },
    { id: '4', name: 'Release Radar', icon: null },
  ];

  return (
    <div className="w-64 bg-spotify-black h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-spotify-green">Spotify 2.0</h1>
      </div>

      {/* Navigation */}
      <nav className="px-6 mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'text-white bg-spotify-gray' 
                      : 'text-spotify-lightGray hover:text-white hover:bg-spotify-gray/50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Playlists */}
      <div className="px-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-spotify-lightGray uppercase tracking-wider">
            Playlists
          </h2>
          <button className="text-spotify-lightGray hover:text-white">
            <Plus size={16} />
          </button>
        </div>
        
        <ul className="space-y-1">
          {playlistItems.map((playlist) => {
            const Icon = playlist.icon;
            return (
              <li key={playlist.id}>
                <Link
                  to={`/playlist/${playlist.id}`}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-spotify-lightGray hover:text-white hover:bg-spotify-gray/50 transition-colors"
                >
                  {Icon && <Icon size={16} />}
                  <span className="text-sm truncate">{playlist.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Section */}
      <div className="p-6 border-t border-spotify-gray">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <User size={16} className="text-spotify-black" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-spotify-lightGray">Premium</p>
          </div>
          <button className="text-spotify-lightGray hover:text-white">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 