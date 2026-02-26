import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="relative">
        {/* Outer Ring (Light Purple) */}
        <div className="w-14 h-14 border-4 border-purple-200 rounded-full"></div>
        
        {/* Spinning Ring (Deep Purple) */}
        <div className="absolute top-0 left-0 w-14 h-14 border-4 border-purple-600 rounded-full border-t-transparent animate-spin shadow-lg"></div>
        
        {/* Center Glow (Optional but looks cool) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;