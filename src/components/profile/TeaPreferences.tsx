
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface TeaPreferencesProps {
  favoriteTeaTypes: string[];
  preferredBrewingMethods: string[];
  onTeaTypesChange: (types: string[]) => void;
  onBrewingMethodsChange: (methods: string[]) => void;
}

const TEA_TYPES = [
  'Green Tea', 'Black Tea', 'Oolong', 'White Tea', 'Pu-erh', 
  'Herbal', 'Rooibos', 'Matcha', 'Chai', 'Earl Grey'
];

const BREWING_METHODS = [
  'Loose Leaf', 'Tea Bags', 'Gongfu Style', 'Western Style',
  'Cold Brew', 'Tea Ceremony', 'French Press', 'Teapot'
];

export const TeaPreferences: React.FC<TeaPreferencesProps> = ({
  favoriteTeaTypes,
  preferredBrewingMethods,
  onTeaTypesChange,
  onBrewingMethodsChange,
}) => {
  const handleTeaTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      onTeaTypesChange([...favoriteTeaTypes, type]);
    } else {
      onTeaTypesChange(favoriteTeaTypes.filter(t => t !== type));
    }
  };

  const handleBrewingMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      onBrewingMethodsChange([...preferredBrewingMethods, method]);
    } else {
      onBrewingMethodsChange(preferredBrewingMethods.filter(m => m !== method));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-tea-earth mb-3">
          Favorite Tea Types
        </label>
        <div className="grid grid-cols-2 gap-3">
          {TEA_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`tea-${type}`}
                checked={favoriteTeaTypes.includes(type)}
                onCheckedChange={(checked) => handleTeaTypeChange(type, checked as boolean)}
              />
              <label
                htmlFor={`tea-${type}`}
                className="text-sm text-tea-earth cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-tea-earth mb-3">
          Preferred Brewing Methods
        </label>
        <div className="grid grid-cols-2 gap-3">
          {BREWING_METHODS.map((method) => (
            <div key={method} className="flex items-center space-x-2">
              <Checkbox
                id={`method-${method}`}
                checked={preferredBrewingMethods.includes(method)}
                onCheckedChange={(checked) => handleBrewingMethodChange(method, checked as boolean)}
              />
              <label
                htmlFor={`method-${method}`}
                className="text-sm text-tea-earth cursor-pointer"
              >
                {method}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
