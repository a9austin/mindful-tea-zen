
import React, { useState, useEffect } from 'react';
import { TeaSelector } from '@/components/TeaSelector';
import { BrewingTimer } from '@/components/BrewingTimer';
import { MindfulnessPractice } from '@/components/MindfulnessPractice';
import { BrewingInstructions } from '@/components/BrewingInstructions';
import { Card } from '@/components/ui/card';

export interface TeaType {
  id: string;
  name: string;
  temperature: number;
  steepTime: number;
  teaAmount: string;
  description: string;
  color: string;
}

const Index = () => {
  const [selectedTea, setSelectedTea] = useState<TeaType | null>(null);
  const [isBrewingActive, setIsBrewingActive] = useState(false);
  const [currentStage, setCurrentStage] = useState<'preparation' | 'heating' | 'steeping' | 'ready'>('preparation');

  const handleStartBrewing = () => {
    if (selectedTea) {
      setIsBrewingActive(true);
      setCurrentStage('heating');
    }
  };

  const handleBrewingComplete = () => {
    setIsBrewingActive(false);
    setCurrentStage('ready');
  };

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
          {!selectedTea ? (
            <TeaSelector onTeaSelect={setSelectedTea} />
          ) : (
            <>
              {/* Selected Tea Info */}
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-light text-tea-earth">
                    {selectedTea.name}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedTea(null);
                      setIsBrewingActive(false);
                      setCurrentStage('preparation');
                    }}
                    className="text-tea-stone hover:text-tea-earth transition-colors text-sm"
                  >
                    Change Tea
                  </button>
                </div>
                <p className="text-tea-stone mb-6">{selectedTea.description}</p>
              </Card>

              {/* Brewing Instructions */}
              <BrewingInstructions tea={selectedTea} currentStage={currentStage} />

              {/* Timer and Mindfulness */}
              {isBrewingActive ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <BrewingTimer
                    tea={selectedTea}
                    onComplete={handleBrewingComplete}
                    currentStage={currentStage}
                    onStageChange={setCurrentStage}
                  />
                  <MindfulnessPractice stage={currentStage} />
                </div>
              ) : currentStage === 'preparation' ? (
                <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
                      <span className="text-3xl">🫖</span>
                    </div>
                    <h3 className="text-xl font-light text-tea-earth mb-2">
                      Ready to begin your mindful brewing journey?
                    </h3>
                    <p className="text-tea-stone">
                      Take a moment to center yourself before we start
                    </p>
                  </div>
                  <button
                    onClick={handleStartBrewing}
                    className="bg-tea-sage hover:bg-tea-sage/80 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  >
                    Begin Brewing
                  </button>
                </Card>
              ) : (
                <Card className="p-8 text-center bg-card/80 backdrop-blur-sm border-tea-stone/20">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
                      <span className="text-3xl animate-breathe">🍃</span>
                    </div>
                    <h3 className="text-xl font-light text-tea-earth mb-2">
                      Your tea is ready
                    </h3>
                    <p className="text-tea-stone mb-6">
                      Take a moment to appreciate the aroma and warmth
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStage('preparation');
                      setIsBrewingActive(false);
                    }}
                    className="bg-tea-earth hover:bg-tea-earth/80 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  >
                    Brew Another Cup
                  </button>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
