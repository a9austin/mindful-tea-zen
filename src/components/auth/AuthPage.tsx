import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AuthForm } from './AuthForm';
import { GoogleSignIn } from './GoogleSignIn';
import { AnimatedBackground } from './animations/AnimatedBackground';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-tea-stone/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
              <span className="text-4xl">🍃</span>
            </div>
            <h1 className="text-2xl font-light text-tea-earth mb-2 tracking-wide">
              {isSignUp ? 'Join Our Tea Community' : 'Welcome Back, Tea Lover'}
            </h1>
            <p className="text-tea-stone text-sm">
              {isSignUp 
                ? 'Begin your mindful tea journey with us' 
                : 'Continue your journey of mindful brewing'
              }
            </p>
          </div>

          <div className="space-y-6">
            <GoogleSignIn />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-tea-stone/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-tea-stone">or</span>
              </div>
            </div>

            <AuthForm isSignUp={isSignUp} />

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-tea-sage hover:text-tea-sage/80 transition-colors"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Join us"
                }
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
