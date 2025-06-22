import React from 'react';
import { useParams } from 'react-router-dom';

const Playlist = () => {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Playlist: {id}</h1>
      <p className="text-spotify-lightGray">Playlist details and tracks will appear here.</p>
    </div>
  );
};

export default Playlist; 