import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 via-blue-500 to-blue-700 rounded-lg transform rotate-45 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-blue-600 rounded-md">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 text-white font-bold text-lg">
            UA
          </span>
        </div>
      </div>
      <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 text-transparent bg-clip-text">
        BetUA
      </span>
    </div>
  );
};

export default Logo;
