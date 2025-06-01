
import React from 'react';

export const SuccessAnimation: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="relative mb-6">
        {/* Happy teacup */}
        <div className="text-6xl animate-bounce">
          ☕
        </div>
        
        {/* Floating hearts */}
        <div className="absolute -top-4 -right-4 text-2xl text-red-400 animate-float">
          💚
        </div>
        <div className="absolute -bottom-2 -left-4 text-xl text-red-400 animate-float-delayed">
          💚
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-2 right-8 text-yellow-400 animate-pulse">
          ✨
        </div>
        <div className="absolute bottom-4 left-8 text-yellow-400 animate-pulse delay-500">
          ✨
        </div>
        <div className="absolute top-8 left-12 text-yellow-400 animate-pulse delay-1000">
          ✨
        </div>
        
        {/* Dancing tea sprites */}
        <div className="absolute -right-8 top-1/2 text-2xl animate-spin-slow">
          🧚‍♀️
        </div>
        <div className="absolute -left-8 top-1/2 text-2xl animate-spin-slow delay-700">
          🧚‍♂️
        </div>
      </div>
      
      <h2 className="text-2xl font-light text-tea-earth mb-2">
        Welcome to our tea community! 🌱
      </h2>
      <p className="text-tea-stone">
        You're now part of our mindful tea journey
      </p>
      
      {/* Celebration confetti */}
      <div className="mt-4 flex justify-center space-x-2">
        <span className="text-2xl animate-bounce">🎉</span>
        <span className="text-2xl animate-bounce delay-100">🍃</span>
        <span className="text-2xl animate-bounce delay-200">🎉</span>
      </div>
    </div>
  );
};
