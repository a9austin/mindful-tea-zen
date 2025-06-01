
import React from 'react';

export const TeapotAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative">
        {/* Teapot */}
        <div className="text-4xl animate-bounce">
          🫖
        </div>
        
        {/* Steam */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-60 animate-pulse"></div>
            <div className="w-1 h-6 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-40 animate-pulse delay-200"></div>
            <div className="w-1 h-4 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-60 animate-pulse delay-400"></div>
          </div>
        </div>
        
        {/* Floating tea leaves */}
        <div className="absolute -right-8 top-2 text-lg opacity-70 animate-float">
          🍃
        </div>
        <div className="absolute -left-8 bottom-2 text-lg opacity-60 animate-float-delayed">
          🍃
        </div>
        
        {/* Glowing spirits */}
        <div className="absolute -right-4 -top-2 w-2 h-2 bg-tea-sage rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -left-6 top-4 w-2 h-2 bg-tea-sage rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};
