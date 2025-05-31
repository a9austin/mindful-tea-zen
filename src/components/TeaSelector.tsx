
import React from 'react';
import { Card } from '@/components/ui/card';
import type { TeaType } from '@/pages/Index';

interface TeaSelectorProps {
  onTeaSelect: (tea: TeaType) => void;
}

const teaTypes: TeaType[] = [
  {
    id: 'green',
    name: 'Green Tea',
    temperature: 80,
    steepTime: 180,
    teaAmount: '1 tsp (2-3g)',
    description: 'Delicate and fresh with grassy notes. Perfect for morning mindfulness.',
    color: 'from-green-200 to-green-300'
  },
  {
    id: 'black',
    name: 'Black Tea',
    temperature: 95,
    steepTime: 240,
    teaAmount: '1 tsp (2-3g)',
    description: 'Bold and robust. Ideal for energizing afternoon meditation.',
    color: 'from-amber-600 to-amber-700'
  },
  {
    id: 'oolong',
    name: 'Oolong Tea',
    temperature: 85,
    steepTime: 210,
    teaAmount: '1 tsp (2-3g)',
    description: 'Complex and balanced between green and black. For deep contemplation.',
    color: 'from-yellow-300 to-orange-400'
  },
  {
    id: 'white',
    name: 'White Tea',
    temperature: 75,
    steepTime: 240,
    teaAmount: '2 tsp (3-4g)',
    description: 'Subtle and gentle. Perfect for evening relaxation and reflection.',
    color: 'from-gray-100 to-gray-200'
  },
  {
    id: 'herbal',
    name: 'Herbal Tea',
    temperature: 100,
    steepTime: 300,
    teaAmount: '1 tbsp (3-5g)',
    description: 'Caffeine-free and soothing. Ideal for bedtime mindfulness practice.',
    color: 'from-purple-200 to-pink-200'
  },
  {
    id: 'puer',
    name: 'Pu-erh Tea',
    temperature: 95,
    steepTime: 180,
    teaAmount: '1 tsp (3-4g)',
    description: 'Aged and earthy with deep complexity. For experienced tea meditation.',
    color: 'from-red-800 to-red-900'
  }
];

export const TeaSelector: React.FC<TeaSelectorProps> = ({ onTeaSelect }) => {
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
            onClick={() => onTeaSelect(tea)}
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
