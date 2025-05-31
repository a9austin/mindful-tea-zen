
import React from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Clock, Droplets } from 'lucide-react';
import type { TeaType } from '@/pages/Index';

interface BrewingInstructionsProps {
  tea: TeaType;
  currentStage: 'preparation' | 'heating' | 'steeping' | 'ready';
}

export const BrewingInstructions: React.FC<BrewingInstructionsProps> = ({
  tea,
  currentStage
}) => {
  const getStepStatus = (step: string) => {
    const steps = ['preparation', 'heating', 'steeping', 'ready'];
    const currentIndex = steps.indexOf(currentStage);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  const StepIcon = ({ status, children }: { status: string; children: React.ReactNode }) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
      status === 'completed' ? 'bg-tea-sage text-white' :
      status === 'active' ? 'bg-tea-earth text-white animate-pulse' :
      'bg-tea-stone/20 text-tea-stone'
    }`}>
      {children}
    </div>
  );

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <h3 className="text-lg font-light text-tea-earth mb-6 text-center">
        Brewing Guide
      </h3>
      
      <div className="space-y-6">
        {/* Step 1: Preparation */}
        <div className="flex items-start space-x-4">
          <StepIcon status={getStepStatus('preparation')}>
            <span className="text-sm">1</span>
          </StepIcon>
          <div className="flex-1">
            <h4 className="font-medium text-tea-earth mb-1">Preparation</h4>
            <p className="text-sm text-tea-stone mb-2">
              Gather your gaiwan and measure {tea.teaAmount} of {tea.name.toLowerCase()}
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Droplets className="w-3 h-3" />
                <span>{tea.teaAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Heating */}
        <div className="flex items-start space-x-4">
          <StepIcon status={getStepStatus('heating')}>
            <Thermometer className="w-4 h-4" />
          </StepIcon>
          <div className="flex-1">
            <h4 className="font-medium text-tea-earth mb-1">Heat Water</h4>
            <p className="text-sm text-tea-stone mb-2">
              Heat water to {tea.temperature}°C. Listen to the water as it heats and practice mindful breathing.
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3" />
                <span>{tea.temperature}°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Steeping */}
        <div className="flex items-start space-x-4">
          <StepIcon status={getStepStatus('steeping')}>
            <Clock className="w-4 h-4" />
          </StepIcon>
          <div className="flex-1">
            <h4 className="font-medium text-tea-earth mb-1">Steep Tea</h4>
            <p className="text-sm text-tea-stone mb-2">
              Pour water over tea leaves and steep for {Math.floor(tea.steepTime / 60)}:{(tea.steepTime % 60).toString().padStart(2, '0')} minutes. 
              Watch the leaves unfurl and release their essence.
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{Math.floor(tea.steepTime / 60)}:{(tea.steepTime % 60).toString().padStart(2, '0')} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Enjoy */}
        <div className="flex items-start space-x-4">
          <StepIcon status={getStepStatus('ready')}>
            <span className="text-sm">🍃</span>
          </StepIcon>
          <div className="flex-1">
            <h4 className="font-medium text-tea-earth mb-1">Mindful Enjoyment</h4>
            <p className="text-sm text-tea-stone">
              Hold the warm cup in your hands. Inhale the aroma deeply. 
              Take your first sip slowly and mindfully, savoring each moment.
            </p>
          </div>
        </div>
      </div>

      {/* Current Stage Highlight */}
      {currentStage !== 'preparation' && (
        <div className="mt-6 p-4 bg-tea-sage/10 rounded-lg border border-tea-sage/20">
          <p className="text-sm text-tea-earth text-center">
            {currentStage === 'heating' && '🔥 Water is heating - practice mindful breathing'}
            {currentStage === 'steeping' && '⏳ Tea is steeping - embrace this moment of patience'}
            {currentStage === 'ready' && '✨ Your tea is ready - enjoy mindfully'}
          </p>
        </div>
      )}
    </Card>
  );
};
