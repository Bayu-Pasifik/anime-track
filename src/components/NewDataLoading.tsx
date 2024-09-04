import React from 'react';

const NewDataLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-12 h-12">
        {/* Small Circle */}
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        {/* Dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200 ml-2"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400 ml-2"></div>
        </div>
        {/* Loading Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default NewDataLoading;
