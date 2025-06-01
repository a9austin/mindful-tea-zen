
import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating tea leaves */}
      <div className="absolute top-10 left-10 w-4 h-4 opacity-20 animate-float">
        🍃
      </div>
      <div className="absolute top-32 right-20 w-4 h-4 opacity-30 animate-float-delayed">
        🍃
      </div>
      <div className="absolute bottom-40 left-32 w-4 h-4 opacity-25 animate-float">
        🌸
      </div>
      <div className="absolute top-64 left-1/2 w-4 h-4 opacity-20 animate-float-delayed">
        🍃
      </div>
      <div className="absolute bottom-20 right-16 w-4 h-4 opacity-30 animate-float">
        🌸
      </div>
      
      {/* Fireflies */}
      <div className="absolute top-20 right-32 w-2 h-2 bg-yellow-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-yellow-300 rounded-full opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-yellow-300 rounded-full opacity-30 animate-pulse delay-2000"></div>
    </div>
  );
};
