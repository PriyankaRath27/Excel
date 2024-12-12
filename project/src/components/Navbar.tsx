import React from 'react';
import { RotateCcw } from 'lucide-react';

interface NavbarProps {
  onRefresh: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-xl font-bold text-gray-800">Medicine Data Viewer</h1>
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>
    </nav>
  );
};