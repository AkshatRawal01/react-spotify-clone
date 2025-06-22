import React from 'react';
import { useParams } from 'react-router-dom';

const Album = () => {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Album: {id}</h1>
      <p className="text-spotify-lightGray">Album details and tracks will appear here.</p>
    </div>
  );
};

export default Album; 