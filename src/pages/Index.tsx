
import React from 'react';
import { SessionProvider, useSession } from '@/contexts/SessionContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SessionManager } from '@/components/SessionManager';
import { ActiveSessionView } from '@/components/ActiveSessionView';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthenticatedContent = () => {
  const { activeSessionId, sessions } = useSession();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with user info */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-tea-sage/20 flex items-center justify-center">
                <span className="text-2xl">🍵</span>
              </div>
              <div className="text-left">
                <p className="text-sm text-tea-stone">Welcome back,</p>
                <p className="font-medium text-tea-earth">{user?.email?.split('@')[0] || 'Tea Lover'}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="border-tea-stone/30 hover:bg-tea-sage/10"
              >
                Profile
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                className="border-tea-stone/30 hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>
          </div>
          
          <h1 className="text-4xl font-light text-tea-earth mb-2 tracking-wide">
            Mindful Tea
          </h1>
          <p className="text-tea-stone text-lg font-light">
            Brew with intention, sip with presence
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:gap-8">
          {!activeSession ? (
            <SessionManager />
          ) : (
            <ActiveSessionView session={activeSession} />
          )}
        </div>
      </div>
    </div>
  );
};

const UnauthenticatedContent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-tea-sage/20 flex items-center justify-center">
            <span className="text-4xl">🍃</span>
          </div>
          
          <h1 className="text-4xl font-light text-tea-earth mb-4 tracking-wide">
            Welcome to Mindful Tea
          </h1>
          <p className="text-tea-stone text-lg font-light mb-8">
            The home for tea enthusiasts - brew with intention, sip with presence
          </p>
          
          <div className="space-y-4">
            <p className="text-tea-earth">
              Join our community of mindful tea lovers and discover the art of conscious brewing
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => navigate('/auth')}
                className="bg-tea-sage hover:bg-tea-sage/80 text-white px-8 py-3 rounded-full font-light text-lg transition-all duration-300 hover:scale-105"
              >
                Begin Your Journey
              </Button>
            </div>
          </div>
        </div>
        
        {/* Feature preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-3xl mb-4">🫖</div>
            <h3 className="font-medium text-tea-earth mb-2">Mindful Brewing</h3>
            <p className="text-tea-stone text-sm">Create personalized tea sessions with guided mindfulness practices</p>
          </div>
          
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-3xl mb-4">🌿</div>
            <h3 className="font-medium text-tea-earth mb-2">Tea Library</h3>
            <p className="text-tea-stone text-sm">Explore brewing techniques for different tea types and styles</p>
          </div>
          
          <div className="text-center p-6 bg-card/50 rounded-lg">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="font-medium text-tea-earth mb-2">Tea Journal</h3>
            <p className="text-tea-stone text-sm">Track your tea journey and discover your preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndexContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🍃</div>
          <p className="text-tea-stone">Preparing your tea experience...</p>
        </div>
      </div>
    );
  }

  return user ? (
    <SessionProvider>
      <AuthenticatedContent />
    </SessionProvider>
  ) : (
    <UnauthenticatedContent />
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
