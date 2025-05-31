
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { teaTypes, formatTemperature } from '@/data/teaData';
import type { TeaType, BrewingStyle } from '@/types/tea';

interface TeaSelectorProps {
  onTeaSelect: (tea: TeaType, style: BrewingStyle) => void;
}

export const TeaSelector: React.FC<TeaSelectorProps> = ({ onTeaSelect }) => {
  const [selectedTea, setSelectedTea] = useState<TeaType | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<BrewingStyle>('western');

  const handleTeaClick = (tea: TeaType) => {
    setSelectedTea(tea);
  };

  const handleStyleSelect = (style: BrewingStyle) => {
    setSelectedStyle(style);
    if (selectedTea) {
      onTeaSelect(selectedTea, style);
    }
  };

  if (selectedTea) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-light text-tea-earth mb-2">
            Choose Your Brewing Style
          </h2>
          <p className="text-tea-stone">
            Select the brewing method that resonates with your practice
          </p>
        </div>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-tea-earth">{selectedTea.name}</h3>
            <button
              onClick={() => setSelectedTea(null)}
              className="text-tea-stone hover:text-tea-earth transition-colors text-sm"
            >
              Change Tea
            </button>
          </div>
          <p className="text-tea-stone text-sm mb-4">{selectedTea.description}</p>
          
          {selectedTea.brewingNotes && (
            <div className="mb-6 p-3 bg-tea-sage/10 rounded-lg border border-tea-sage/20">
              <p className="text-xs text-tea-earth">
                <span className="font-medium">Brewing Note:</span> {selectedTea.brewingNotes}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Western Style */}
            <Card
              className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 border-tea-stone/20 group"
              onClick={() => handleStyleSelect('western')}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-tea-sage/20 flex items-center justify-center group-hover:animate-pulse">
                  <span className="text-xl">🫖</span>
                </div>
                <h4 className="font-medium text-tea-earth mb-2">Western Style</h4>
                <div className="text-xs text-tea-stone space-y-1">
                  <p>{formatTemperature(selectedTea.temperature)}</p>
                  <p>{Math.floor(selectedTea.steepTime / 60)}:{(selectedTea.steepTime % 60).toString().padStart(2, '0')} min</p>
                  <p>{selectedTea.teaAmount}</p>
                  <p className="text-tea-sage">Single long infusion</p>
                </div>
              </div>
            </Card>

            {/* Gong-fu Style */}
            <Card
              className="p-4 cursor-pointer transition-all duration-300 hover:scale-105 border-tea-stone/20 group"
              onClick={() => handleStyleSelect('gongfu')}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-tea-earth/20 flex items-center justify-center group-hover:animate-pulse">
                  <span className="text-xl">🏮</span>
                </div>
                <h4 className="font-medium text-tea-earth mb-2">Gong-fu Style</h4>
                <div className="text-xs text-tea-stone space-y-1">
                  <p>{formatTemperature(selectedTea.gongfu?.temperature || selectedTea.temperature)}</p>
                  <p>{selectedTea.gongfu?.firstSteepTime}s first steep</p>
                  <p>{selectedTea.gongfu?.teaAmount}</p>
                  <p className="text-tea-earth">Up to {selectedTea.gongfu?.maxInfusions} infusions</p>
                  {selectedTea.gongfu?.rinseRequired && (
                    <p className="text-tea-sage text-[10px]">
                      Rinse required ({selectedTea.gongfu.rinseCount || 1}x)
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Gong-fu specific guidance */}
          {selectedTea.gongfu?.notes && (
            <div className="mt-4 p-3 bg-tea-earth/5 rounded-lg border border-tea-earth/10">
              <p className="text-xs text-tea-earth">
                <span className="font-medium">Gong-fu Notes:</span> {selectedTea.gongfu.notes}
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light text-tea-earth mb-2">
          Choose Your Tea
        </h2>
        <p className="text-tea-stone">
          Select the tea that speaks to your current mood and intention
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teaTypes.map((tea) => (
          <Card
            key={tea.id}
            className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card/80 backdrop-blur-sm border-tea-stone/20 group"
            onClick={() => handleTeaClick(tea)}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tea.color} flex items-center justify-center group-hover:animate-pulse`}>
                <span className="text-2xl">
                  {tea.category === 'green' && '🍃'}
                  {tea.category === 'black' && '☕'}
                  {(tea.category === 'oolong' || tea.id.includes('oolong')) && '🌿'}
                  {tea.category === 'white' && '🤍'}
                  {tea.category === 'puer' && '🍂'}
                  {tea.category === 'yellow' && '💛'}
                  {tea.category === 'herbal' && '🌸'}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-tea-earth mb-2">
                {tea.name}
              </h3>
              
              <p className="text-sm text-tea-stone mb-4 line-clamp-2">
                {tea.description}
              </p>
              
              <div className="space-y-1 text-xs text-tea-stone">
                <p>{formatTemperature(tea.temperature)}</p>
                <p>{Math.floor(tea.steepTime / 60)}:{(tea.steepTime % 60).toString().padStart(2, '0')} min Western</p>
                <p>{tea.teaAmount}</p>
                {tea.gongfu && (
                  <p className="text-tea-earth text-[10px]">
                    Gong-fu: up to {tea.gongfu.maxInfusions} steeps
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
