import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PlayerControls from '../Player/PlayerControls';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-spotify-dark">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        {/* Player Controls */}
        <PlayerControls />
      </div>
    </div>
  );
};

export default Layout; 