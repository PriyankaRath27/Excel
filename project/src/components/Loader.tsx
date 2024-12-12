import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="ml-3 text-lg text-gray-700">Processing...</p>
    </div>
  );
};