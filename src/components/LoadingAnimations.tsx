import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-color">
      <div className="relative w-24 h-24">
        {/* Circle */}
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        {/* Dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200 ml-2"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400 ml-2"></div>
        </div>
        {/* Anime Title Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
