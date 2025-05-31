
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface MindfulnessPracticeProps {
  stage: 'preparation' | 'heating' | 'steeping' | 'ready';
}

interface Practice {
  title: string;
  instruction: string;
  breathingPattern?: {
    inhale: number;
    hold: number;
    exhale: number;
  };
  reflection?: string[];
}

const practices: Record<string, Practice> = {
  heating: {
    title: 'Warming Breath',
    instruction: 'As the water heats, synchronize your breath with the rising temperature. Feel warmth building within you.',
    breathingPattern: {
      inhale: 4,
      hold: 2,
      exhale: 6
    }
  },
  steeping: {
    title: 'Patience Meditation',
    instruction: 'Like tea leaves slowly releasing their essence, allow this moment to unfold naturally. Practice patience and presence.',
    reflection: [
      'What am I grateful for in this moment?',
      'How does the tea aroma make me feel?',
      'What intentions do I set for this day?',
      'How can I carry this calm into my next activity?'
    ]
  }
};

export const MindfulnessPractice: React.FC<MindfulnessPracticeProps> = ({ stage }) => {
  const [currentReflection, setCurrentReflection] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathTimer, setBreathTimer] = useState(0);

  const practice = practices[stage];

  useEffect(() => {
    if (practice?.breathingPattern) {
      const pattern = practice.breathingPattern;
      let interval: NodeJS.Timeout;

      const cycle = () => {
        setBreathTimer(0);
        setBreathPhase('inhale');
        
        // Inhale phase
        setTimeout(() => {
          setBreathPhase('hold');
          setTimeout(() => {
            setBreathPhase('exhale');
          }, pattern.hold * 1000);
        }, pattern.inhale * 1000);
      };

      interval = setInterval(cycle, (pattern.inhale + pattern.hold + pattern.exhale) * 1000);
      cycle(); // Start immediately

      return () => clearInterval(interval);
    }
  }, [practice]);

  useEffect(() => {
    if (practice?.reflection) {
      const interval = setInterval(() => {
        setCurrentReflection(prev => (prev + 1) % practice.reflection!.length);
      }, 15000); // Change reflection every 15 seconds

      return () => clearInterval(interval);
    }
  }, [practice]);

  if (!practice) {
    return (
      <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
            <span className="text-2xl">🧘‍♀️</span>
          </div>
          <h3 className="text-lg font-light text-tea-earth mb-2">
            Find Your Center
          </h3>
          <p className="text-tea-stone text-sm">
            Take a moment to be present with your tea brewing journey
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
          <span className="text-2xl">🧘‍♀️</span>
        </div>
        <h3 className="text-lg font-light text-tea-earth mb-2">
          {practice.title}
        </h3>
        <p className="text-tea-stone text-sm">
          {practice.instruction}
        </p>
      </div>

      {practice.breathingPattern && (
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className={`w-20 h-20 mx-auto rounded-full border-4 transition-all duration-1000 ${
              breathPhase === 'inhale' ? 'border-tea-sage scale-110' :
              breathPhase === 'hold' ? 'border-tea-earth scale-110' :
              'border-tea-stone scale-90'
            }`}>
              <div className={`w-full h-full rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale' ? 'bg-tea-sage/30 animate-breathe' :
                breathPhase === 'hold' ? 'bg-tea-earth/30' :
                'bg-tea-stone/20'
              }`} />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-light text-tea-earth capitalize mb-2">
              {breathPhase}
            </p>
            <div className="text-sm text-tea-stone">
              <span>Inhale {practice.breathingPattern.inhale}s</span>
              {practice.breathingPattern.hold > 0 && <span> • Hold {practice.breathingPattern.hold}s</span>}
              <span> • Exhale {practice.breathingPattern.exhale}s</span>
            </div>
          </div>
        </div>
      )}

      {practice.reflection && (
        <div className="bg-tea-sage/10 rounded-lg p-4 text-center">
          <p className="text-sm text-tea-stone mb-2">Reflect on:</p>
          <p className="text-tea-earth font-light transition-all duration-500">
            {practice.reflection[currentReflection]}
          </p>
        </div>
      )}
    </Card>
  );
};
