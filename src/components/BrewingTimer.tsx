
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Timer, RotateCcw, Thermometer } from 'lucide-react';
import { formatTemperature } from '@/data/teaData';
import type { TeaType, BrewingStyle } from '@/types/tea';

interface BrewingTimerProps {
  tea: TeaType;
  brewingStyle: BrewingStyle;
  onComplete: () => void;
  currentStage: 'preparation' | 'heating' | 'steeping' | 'ready';
  onStageChange: (stage: 'preparation' | 'heating' | 'steeping' | 'ready') => void;
}

export const BrewingTimer: React.FC<BrewingTimerProps> = ({
  tea,
  brewingStyle,
  onComplete,
  currentStage,
  onStageChange
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentInfusion, setCurrentInfusion] = useState(1);

  const isGongfu = brewingStyle === 'gongfu';

  useEffect(() => {
    if (currentStage === 'heating') {
      setTotalTime(60); // 1 minute for heating
      setTimeRemaining(60);
      setIsActive(true);
    } else if (currentStage === 'steeping') {
      const steepTime = isGongfu 
        ? tea.gongfu!.firstSteepTime + ((currentInfusion - 1) * 7) // Increase by 7s each infusion
        : tea.steepTime;
      setTotalTime(steepTime);
      setTimeRemaining(steepTime);
      setIsActive(true);
    }
  }, [currentStage, tea, isGongfu, currentInfusion]);

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

  const handleNextInfusion = () => {
    if (isGongfu && currentInfusion < tea.gongfu!.maxInfusions) {
      setCurrentInfusion(prev => prev + 1);
      onStageChange('steeping');
    }
  };

  const getStageInfo = () => {
    const temp = isGongfu ? tea.gongfu!.temperature : tea.temperature;
    
    switch (currentStage) {
      case 'heating':
        return {
          title: 'Heating Water',
          subtitle: `Bringing water to ${formatTemperature(temp)}`,
          icon: '♨️',
          animation: 'animate-breathe'
        };
      case 'steeping':
        return {
          title: isGongfu ? `Infusion ${currentInfusion}` : 'Steeping Tea',
          subtitle: isGongfu 
            ? `${tea.gongfu!.firstSteepTime + ((currentInfusion - 1) * 7)}s steep - ${currentInfusion}/${tea.gongfu!.maxInfusions}`
            : 'Let the flavors unfold mindfully',
          icon: isGongfu ? '🏮' : '🫖',
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
        <p className="text-tea-stone text-sm mb-2">
          {stageInfo.subtitle}
        </p>
        
        {/* Tea details */}
        <div className="flex justify-center items-center space-x-4 text-xs text-tea-stone/80">
          <div className="flex items-center space-x-1">
            <Thermometer className="w-3 h-3" />
            <span>{formatTemperature(isGongfu ? tea.gongfu!.temperature : tea.temperature)}</span>
          </div>
          <span>•</span>
          <span>{tea.name}</span>
        </div>
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

      {/* Gong-fu specific elements */}
      {isGongfu && currentStage === 'ready' && currentInfusion < tea.gongfu!.maxInfusions && (
        <div className="mb-4">
          <button
            onClick={handleNextInfusion}
            className="bg-tea-earth hover:bg-tea-earth/80 text-white px-6 py-2 rounded-full font-light transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Next Infusion ({currentInfusion + 1}/{tea.gongfu!.maxInfusions})
          </button>
          <p className="text-xs text-tea-stone mt-2">
            Increase time by ~5-10 seconds for deeper extraction
          </p>
        </div>
      )}

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
        {currentStage === 'heating' && (isGongfu 
          ? 'Warm your teaware and focus on your breath'
          : 'Focus on your breath as the water warms'
        )}
        {currentStage === 'steeping' && (isGongfu 
          ? `Infusion ${currentInfusion} - watch the essence emerge gradually`
          : 'Watch the tea leaves dance and unfurl'
        )}
      </div>
    </Card>
  );
};
