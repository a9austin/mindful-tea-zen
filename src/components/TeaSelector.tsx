
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { TeaType, BrewingStyle } from '@/pages/Index';

interface TeaSelectorProps {
  onTeaSelect: (tea: TeaType, style: BrewingStyle) => void;
}

const teaTypes: TeaType[] = [
  {
    id: 'green',
    name: 'Green Tea',
    temperature: 80,
    steepTime: 180,
    teaAmount: '1 tsp (2-3g)',
    description: 'Delicate and fresh with grassy notes. Perfect for morning mindfulness.',
    color: 'from-green-200 to-green-300',
    gongfu: {
      temperature: 80,
      firstSteepTime: 10,
      teaAmount: '5-6g per 100ml',
      maxInfusions: 8
    }
  },
  {
    id: 'black',
    name: 'Black Tea',
    temperature: 95,
    steepTime: 240,
    teaAmount: '1 tsp (2-3g)',
    description: 'Bold and robust. Ideal for energizing afternoon meditation.',
    color: 'from-amber-600 to-amber-700',
    gongfu: {
      temperature: 95,
      firstSteepTime: 15,
      teaAmount: '6-7g per 100ml',
      maxInfusions: 10
    }
  },
  {
    id: 'oolong',
    name: 'Oolong Tea',
    temperature: 85,
    steepTime: 210,
    teaAmount: '1 tsp (2-3g)',
    description: 'Complex and balanced between green and black. For deep contemplation.',
    color: 'from-yellow-300 to-orange-400',
    gongfu: {
      temperature: 90,
      firstSteepTime: 8,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 15
    }
  },
  {
    id: 'white',
    name: 'White Tea',
    temperature: 75,
    steepTime: 240,
    teaAmount: '2 tsp (3-4g)',
    description: 'Subtle and gentle. Perfect for evening relaxation and reflection.',
    color: 'from-gray-100 to-gray-200',
    gongfu: {
      temperature: 85,
      firstSteepTime: 12,
      teaAmount: '5-6g per 100ml',
      maxInfusions: 12
    }
  },
  {
    id: 'herbal',
    name: 'Herbal Tea',
    temperature: 100,
    steepTime: 300,
    teaAmount: '1 tbsp (3-5g)',
    description: 'Caffeine-free and soothing. Ideal for bedtime mindfulness practice.',
    color: 'from-purple-200 to-pink-200',
    gongfu: {
      temperature: 100,
      firstSteepTime: 20,
      teaAmount: '6-8g per 100ml',
      maxInfusions: 6
    }
  },
  {
    id: 'puer',
    name: 'Pu-erh Tea',
    temperature: 95,
    steepTime: 180,
    teaAmount: '1 tsp (3-4g)',
    description: 'Aged and earthy with deep complexity. For experienced tea meditation.',
    color: 'from-red-800 to-red-900',
    gongfu: {
      temperature: 100,
      firstSteepTime: 5,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 20
    }
  }
];

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
          <p className="text-tea-stone text-sm mb-6">{selectedTea.description}</p>

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
                  <p>{selectedTea.temperature}°C • {Math.floor(selectedTea.steepTime / 60)}:{(selectedTea.steepTime % 60).toString().padStart(2, '0')} min</p>
                  <p>{selectedTea.teaAmount}</p>
                  <p>Single long infusion</p>
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
                  <p>{selectedTea.gongfu?.temperature}°C • {selectedTea.gongfu?.firstSteepTime}s first</p>
                  <p>{selectedTea.gongfu?.teaAmount}</p>
                  <p>Up to {selectedTea.gongfu?.maxInfusions} infusions</p>
                </div>
              </div>
            </Card>
          </div>
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
                  {tea.id === 'green' && '🍃'}
                  {tea.id === 'black' && '☕'}
                  {tea.id === 'oolong' && '🌿'}
                  {tea.id === 'white' && '🤍'}
                  {tea.id === 'herbal' && '🌸'}
                  {tea.id === 'puer' && '🍂'}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-tea-earth mb-2">
                {tea.name}
              </h3>
              
              <p className="text-sm text-tea-stone mb-4 line-clamp-2">
                {tea.description}
              </p>
              
              <div className="space-y-1 text-xs text-tea-stone">
                <p>{tea.temperature}°C • {Math.floor(tea.steepTime / 60)}:{(tea.steepTime % 60).toString().padStart(2, '0')} min</p>
                <p>{tea.teaAmount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
