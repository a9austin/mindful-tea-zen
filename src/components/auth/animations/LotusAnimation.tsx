
import React from 'react';

export const LotusAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative">
        {/* Lotus pond */}
        <div className="w-24 h-16 bg-gradient-to-b from-blue-100 to-blue-200 rounded-full opacity-30"></div>
        
        {/* Lotus flowers */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl animate-bloom">
          🪷
        </div>
        <div className="absolute top-4 left-4 text-lg animate-bloom delay-500">
          🪷
        </div>
        <div className="absolute top-4 right-4 text-lg animate-bloom delay-1000">
          🪷
        </div>
        
        {/* Misty clouds */}
        <div className="absolute -top-4 left-8 w-8 h-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full opacity-30 animate-drift"></div>
        <div className="absolute -top-2 right-6 w-6 h-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full opacity-40 animate-drift-delayed"></div>
        
        {/* Ripples */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 border border-blue-300 rounded-full opacity-20 animate-ripple"></div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-1 border border-blue-300 rounded-full opacity-15 animate-ripple delay-300"></div>
      </div>
    </div>
  );
};
