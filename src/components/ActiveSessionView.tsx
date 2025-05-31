
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, SkipForward } from 'lucide-react';
import { TeaSession } from '@/types/session';
import { useSession } from '@/contexts/SessionContext';
import { SessionTimer } from '@/components/SessionTimer';
import { SessionMindfulness } from '@/components/SessionMindfulness';

interface ActiveSessionViewProps {
  session: TeaSession;
}

export const ActiveSessionView: React.FC<ActiveSessionViewProps> = ({ session }) => {
  const { setActiveSession, updateSession } = useSession();
  const [currentStage, setCurrentStage] = useState<'preparation' | 'heating' | 'steeping' | 'ready'>('preparation');

  const handleStartBrewing = () => {
    updateSession(session.id, { status: 'heating' });
    setCurrentStage('heating');
  };

  const handleNextSteep = () => {
    if (session.currentSteep < session.totalSteeps) {
      updateSession(session.id, { 
        currentSteep: session.currentSteep + 1,
        status: 'heating'
      });
      setCurrentStage('heating');
    } else {
      updateSession(session.id, { status: 'completed' });
      setCurrentStage('ready');
    }
  };

  const handleCompleteSession = () => {
    updateSession(session.id, { status: 'completed' });
  };

  const getCurrentSteepTime = () => {
    const steepIndex = session.currentSteep - 1;
    return session.steepTimes[steepIndex] || session.steepTimes[session.steepTimes.length - 1];
  };

  return (
    <>
      {/* Session Header */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveSession(null)}
            className="flex items-center space-x-2 text-tea-stone hover:text-tea-earth transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sessions</span>
          </button>
          <div className="text-right">
            <h2 className="text-xl font-light text-tea-earth">{session.name}</h2>
            <p className="text-sm text-tea-stone">
              Steep {session.currentSteep} of {session.totalSteeps} • {session.teaType}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-tea-stone/20 rounded-full h-2">
          <div
            className="bg-tea-sage h-2 rounded-full transition-all duration-300"
            style={{ width: `${(session.currentSteep / session.totalSteeps) * 100}%` }}
          />
        </div>
      </Card>

      {/* Brewing Instructions */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
        <h3 className="text-lg font-light text-tea-earth mb-4 text-center">
          Gong-fu Brewing - Steep {session.currentSteep}
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-tea-sage/10 rounded-lg">
            <div className="text-2xl mb-2">🌡️</div>
            <div className="text-sm text-tea-stone">Water Temperature</div>
            <div className="font-medium text-tea-earth">{session.waterTemperature}°C</div>
          </div>
          
          <div className="p-4 bg-tea-sage/10 rounded-lg">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="text-sm text-tea-stone">Steep Time</div>
            <div className="font-medium text-tea-earth">{getCurrentSteepTime()}s</div>
          </div>
          
          <div className="p-4 bg-tea-sage/10 rounded-lg">
            <div className="text-2xl mb-2">🍃</div>
            <div className="text-sm text-tea-stone">Tea Amount</div>
            <div className="font-medium text-tea-earth">5-8g / 100ml</div>
          </div>
        </div>

        {currentStage === 'preparation' && session.status !== 'completed' && (
          <div className="text-center mt-6">
            <button
              onClick={handleStartBrewing}
              className="bg-tea-sage hover:bg-tea-sage/80 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
            >
              Begin Steep {session.currentSteep}
            </button>
          </div>
        )}
      </Card>

      {/* Timer and Mindfulness */}
      {(currentStage === 'heating' || currentStage === 'steeping') && (
        <div className="grid md:grid-cols-2 gap-6">
          <SessionTimer
            session={session}
            currentStage={currentStage}
            onStageChange={setCurrentStage}
            onComplete={() => setCurrentStage('ready')}
            steepTime={getCurrentSteepTime()}
          />
          {session.mindfulnessEnabled && (
            <SessionMindfulness 
              stage={currentStage} 
              theme={session.mindfulnessTheme}
              steepNumber={session.currentSteep}
            />
          )}
        </div>
      )}

      {/* Ready State */}
      {currentStage === 'ready' && session.status !== 'completed' && (
        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
              <span className="text-3xl animate-breathe">🍃</span>
            </div>
            <h3 className="text-xl font-light text-tea-earth mb-2">
              Steep {session.currentSteep} Ready
            </h3>
            <p className="text-tea-stone mb-6">
              Savor this infusion mindfully
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            {session.currentSteep < session.totalSteeps ? (
              <button
                onClick={handleNextSteep}
                className="bg-tea-sage hover:bg-tea-sage/80 text-white px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <SkipForward className="w-4 h-4" />
                <span>Next Steep ({session.currentSteep + 1}/{session.totalSteeps})</span>
              </button>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="bg-tea-earth hover:bg-tea-earth/80 text-white px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
              >
                Complete Session
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Completed State */}
      {session.status === 'completed' && (
        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tea-earth/20 flex items-center justify-center">
              <span className="text-3xl">🙏</span>
            </div>
            <h3 className="text-xl font-light text-tea-earth mb-2">
              Session Complete
            </h3>
            <p className="text-tea-stone mb-6">
              You've completed all {session.totalSteeps} steeps. Take a moment to appreciate this mindful journey.
            </p>
          </div>
          
          <button
            onClick={() => setActiveSession(null)}
            className="bg-tea-earth hover:bg-tea-earth/80 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
          >
            Return to Sessions
          </button>
        </Card>
      )}
    </>
  );
};
