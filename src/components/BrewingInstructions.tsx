
import React from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Clock, Droplets, RotateCcw, AlertCircle } from 'lucide-react';
import { formatTemperature } from '@/data/teaData';
import type { TeaType, BrewingStyle } from '@/types/tea';

interface BrewingInstructionsProps {
  tea: TeaType;
  brewingStyle: BrewingStyle;
  currentStage: 'preparation' | 'heating' | 'steeping' | 'ready';
}

export const BrewingInstructions: React.FC<BrewingInstructionsProps> = ({
  tea,
  brewingStyle,
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

  const isGongfu = brewingStyle === 'gongfu';
  const temperature = isGongfu ? tea.gongfu!.temperature : tea.temperature;
  const steepTime = isGongfu ? tea.gongfu!.firstSteepTime : tea.steepTime;
  const amount = isGongfu ? tea.gongfu!.teaAmount : tea.teaAmount;

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <h3 className="text-lg font-light text-tea-earth mb-6 text-center">
        {isGongfu ? 'Gong-fu' : 'Western'} Brewing Guide
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
              {isGongfu 
                ? `Prepare your gaiwan or small teapot (100-200ml) and measure ${amount} of ${tea.name.toLowerCase()}`
                : `Gather your teaware and measure ${amount} of ${tea.name.toLowerCase()}`
              }
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Droplets className="w-3 h-3" />
                <span>{amount}</span>
              </div>
              {isGongfu && (
                <div className="flex items-center space-x-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Up to {tea.gongfu!.maxInfusions} infusions</span>
                </div>
              )}
            </div>
            
            {/* Gong-fu specific preparation notes */}
            {isGongfu && tea.gongfu?.notes && (
              <div className="mt-2 p-2 bg-tea-earth/5 rounded text-xs text-tea-earth">
                💡 {tea.gongfu.notes}
              </div>
            )}
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
              Heat water to {formatTemperature(temperature)}. {isGongfu 
                ? 'Warm your teaware by rinsing with hot water, then discard.' 
                : 'Listen to the water as it heats and practice mindful breathing.'
              }
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3" />
                <span>{formatTemperature(temperature)}</span>
              </div>
            </div>
            
            {/* Temperature guidance */}
            {tea.brewingNotes && (
              <div className="mt-2 p-2 bg-tea-sage/10 rounded text-xs text-tea-earth">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                {tea.brewingNotes}
              </div>
            )}
          </div>
        </div>

        {/* Gong-fu Rinse Step (if required) */}
        {isGongfu && tea.gongfu?.rinseRequired && (
          <div className="flex items-start space-x-4">
            <StepIcon status={getStepStatus('preparation')}>
              <span className="text-sm">💧</span>
            </StepIcon>
            <div className="flex-1">
              <h4 className="font-medium text-tea-earth mb-1">Rinse Tea Leaves</h4>
              <p className="text-sm text-tea-stone mb-2">
                Pour hot water over the leaves for {tea.gongfu.rinseTime || 5} seconds and discard. 
                {tea.gongfu.rinseCount === 2 ? ' Repeat this rinse once more.' : ''} 
                This "awakens" the leaves and removes any dust.
              </p>
              <div className="text-xs text-tea-sage">
                Essential for {tea.category} tea to enhance later steeps
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Steeping */}
        <div className="flex items-start space-x-4">
          <StepIcon status={getStepStatus('steeping')}>
            <Clock className="w-4 h-4" />
          </StepIcon>
          <div className="flex-1">
            <h4 className="font-medium text-tea-earth mb-1">
              {isGongfu ? 'First Infusion' : 'Steep Tea'}
            </h4>
            <p className="text-sm text-tea-stone mb-2">
              {isGongfu 
                ? `Pour water over tea leaves and steep for ${steepTime} seconds. Watch the leaves unfurl. Subsequent infusions increase by 5-10 seconds.`
                : `Pour water over tea leaves and steep for ${Math.floor(steepTime / 60)}:${(steepTime % 60).toString().padStart(2, '0')} minutes. Watch the leaves unfurl and release their essence.`
              }
            </p>
            <div className="flex items-center space-x-4 text-xs text-tea-stone">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {isGongfu 
                    ? `${steepTime}s (first)`
                    : `${Math.floor(steepTime / 60)}:${(steepTime % 60).toString().padStart(2, '0')} min`
                  }
                </span>
              </div>
            </div>
            
            {/* Steeping progression for Gong-fu */}
            {isGongfu && (
              <div className="mt-2 p-2 bg-tea-earth/5 rounded text-xs text-tea-earth">
                <strong>Steeping Progression:</strong> Start {steepTime}s → increase by 5-10s each round
              </div>
            )}
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
              {isGongfu 
                ? 'Pour into small cups and savor each sip mindfully. Notice how the flavor evolves with each infusion. Re-steep when ready for the next round.'
                : 'Hold the warm cup in your hands. Inhale the aroma deeply. Take your first sip slowly and mindfully, savoring each moment.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Current Stage Highlight */}
      {currentStage !== 'preparation' && (
        <div className="mt-6 p-4 bg-tea-sage/10 rounded-lg border border-tea-sage/20">
          <p className="text-sm text-tea-earth text-center">
            {currentStage === 'heating' && (isGongfu 
              ? `🔥 Water heating to ${formatTemperature(temperature)} - warm your teaware and center yourself`
              : `🔥 Water heating to ${formatTemperature(temperature)} - practice mindful breathing`
            )}
            {currentStage === 'steeping' && (isGongfu 
              ? '⏳ First infusion steeping - embrace this moment of anticipation'
              : '⏳ Tea is steeping - embrace this moment of patience'
            )}
            {currentStage === 'ready' && (isGongfu 
              ? '✨ First infusion ready - savor and prepare for the next'
              : '✨ Your tea is ready - enjoy mindfully'
            )}
          </p>
        </div>
      )}
    </Card>
  );
};
