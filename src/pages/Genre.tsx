import React from 'react';
import { useParams } from 'react-router-dom';

const Genre = () => {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Genre: {id}</h1>
      <p className="text-spotify-lightGray">Genre details and tracks will appear here.</p>
    </div>
  );
};

export default Genre; 