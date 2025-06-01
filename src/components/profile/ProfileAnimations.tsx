
import React from 'react';

export const ProfileAnimations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Drifting tea leaves */}
      <div className="absolute top-20 left-10 text-2xl opacity-20 animate-drift">
        🍃
      </div>
      <div className="absolute top-40 right-20 text-xl opacity-25 animate-drift-delayed">
        🍃
      </div>
      <div className="absolute bottom-32 left-1/4 text-2xl opacity-20 animate-drift">
        🍃
      </div>
      <div className="absolute top-60 right-1/3 text-xl opacity-30 animate-drift-delayed">
        🍃
      </div>
      
      {/* Glowing fireflies */}
      <div className="absolute top-32 right-16 w-3 h-3 bg-yellow-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-yellow-300 rounded-full opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-12 w-3 h-3 bg-yellow-300 rounded-full opacity-30 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-yellow-300 rounded-full opacity-40 animate-pulse delay-500"></div>
      
      {/* Soft rain effect */}
      <div className="absolute top-0 left-1/4 w-0.5 h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-20 animate-rain"></div>
      <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-15 animate-rain delay-300"></div>
      <div className="absolute top-5 right-1/3 w-0.5 h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-20 animate-rain delay-700"></div>
      
      {/* Cozy window frame */}
      <div className="absolute bottom-10 right-10 opacity-30">
        <div className="w-32 h-24 border-4 border-amber-800 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-lg">
          <div className="w-full h-0.5 bg-amber-800 absolute top-1/2 transform -translate-y-1/2"></div>
          <div className="h-full w-0.5 bg-amber-800 absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};
