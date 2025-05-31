
import React from 'react';
import { SessionProvider, useSession } from '@/contexts/SessionContext';
import { SessionManager } from '@/components/SessionManager';
import { ActiveSessionView } from '@/components/ActiveSessionView';

const IndexContent = () => {
  const { activeSessionId, sessions } = useSession();
  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
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

const Index = () => {
  return (
    <SessionProvider>
      <IndexContent />
    </SessionProvider>
  );
};

export default Index;
