
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Timer } from 'lucide-react';
import type { TeaType } from '@/pages/Index';

interface BrewingTimerProps {
  tea: TeaType;
  onComplete: () => void;
  currentStage: 'preparation' | 'heating' | 'steeping' | 'ready';
  onStageChange: (stage: 'preparation' | 'heating' | 'steeping' | 'ready') => void;
}

export const BrewingTimer: React.FC<BrewingTimerProps> = ({
  tea,
  onComplete,
  currentStage,
  onStageChange
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentStage === 'heating') {
      setTotalTime(60); // 1 minute for heating
      setTimeRemaining(60);
      setIsActive(true);
    } else if (currentStage === 'steeping') {
      setTotalTime(tea.steepTime);
      setTimeRemaining(tea.steepTime);
      setIsActive(true);
    }
  }, [currentStage, tea.steepTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsActive(false);
            if (currentStage === 'heating') {
              onStageChange('steeping');
            } else if (currentStage === 'steeping') {
              onComplete();
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, currentStage, onStageChange, onComplete]);

  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getStageInfo = () => {
    switch (currentStage) {
      case 'heating':
        return {
          title: 'Heating Water',
          subtitle: `Bringing water to ${tea.temperature}°C`,
          icon: '♨️',
          animation: 'animate-breathe'
        };
      case 'steeping':
        return {
          title: 'Steeping Tea',
          subtitle: 'Let the flavors unfold mindfully',
          icon: '🫖',
          animation: 'animate-bloom'
        };
      default:
        return {
          title: 'Brewing',
          subtitle: 'Preparing your mindful moment',
          icon: '🍃',
          animation: ''
        };
    }
  };

  const stageInfo = getStageInfo();

  return (
    <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <div className="mb-6">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center ${stageInfo.animation}`}>
          <span className="text-4xl">{stageInfo.icon}</span>
        </div>
        
        <h3 className="text-xl font-light text-tea-earth mb-2">
          {stageInfo.title}
        </h3>
        <p className="text-tea-stone text-sm">
          {stageInfo.subtitle}
        </p>
      </div>

      {/* Progress Ring */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-tea-stone/20"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={339.292}
            strokeDashoffset={339.292 - (progress / 100) * 339.292}
            className="text-tea-sage transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Timer display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-light text-tea-earth">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <Timer className="w-4 h-4 mx-auto mt-1 text-tea-stone" />
          </div>
        </div>
      </div>

      {/* Bloom animation for steeping */}
      {currentStage === 'steeping' && (
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flower-bloom animate-bloom"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-tea-stone">
        {currentStage === 'heating' && 'Focus on your breath as the water warms'}
        {currentStage === 'steeping' && 'Watch the tea leaves dance and unfurl'}
      </div>
    </Card>
  );
};
