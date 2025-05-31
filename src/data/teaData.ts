
import { TeaType } from '@/types/tea';

export const teaTypes: TeaType[] = [
  {
    id: 'green',
    name: 'Green Tea',
    category: 'green',
    temperature: 80,
    steepTime: 180,
    teaAmount: '1 tsp (2-3g)',
    description: 'Delicate and fresh with grassy notes. Perfect for morning mindfulness.',
    color: 'from-green-200 to-green-300',
    brewingNotes: 'Use lower temperatures for delicate green teas to avoid bitterness.',
    gongfu: {
      temperature: 80,
      firstSteepTime: 10,
      teaAmount: '5-6g per 100ml',
      maxInfusions: 6,
      rinseRequired: false,
      notes: 'Dragonwell (Longjing), Bi Luo Chun varieties work excellently'
    }
  },
  {
    id: 'black',
    name: 'Black Tea (Red Tea)',
    category: 'black',
    temperature: 95,
    steepTime: 240,
    teaAmount: '1 tsp (2-3g)',
    description: 'Bold and malty with robust flavors. Ideal for energizing afternoon sessions.',
    color: 'from-amber-600 to-amber-700',
    brewingNotes: 'Avoid over-steeping to prevent bitterness. Brief rinse optional for high-quality blacks.',
    gongfu: {
      temperature: 93,
      firstSteepTime: 10,
      teaAmount: '6-7g per 100ml',
      maxInfusions: 8,
      rinseRequired: false,
      notes: 'Keemun, Dian Hong varieties. Bold and malty character emerges beautifully'
    }
  },
  {
    id: 'oolong-light',
    name: 'Light Oolong',
    category: 'oolong',
    temperature: 87,
    steepTime: 210,
    teaAmount: '1 tsp (2-3g)',
    description: 'Floral and creamy with complex evolving flavors. Perfect for contemplative sessions.',
    color: 'from-yellow-300 to-orange-400',
    brewingNotes: 'Rinse briefly for tightly rolled varieties. Watch the leaves unfurl beautifully.',
    gongfu: {
      temperature: 87,
      firstSteepTime: 15,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 10,
      rinseRequired: true,
      rinseTime: 5,
      rinseCount: 1,
      notes: 'Tie Guan Yin, Baozhong varieties. Floral and creamy character'
    }
  },
  {
    id: 'oolong-dark',
    name: 'Dark/Roasted Oolong',
    category: 'oolong',
    temperature: 93,
    steepTime: 210,
    teaAmount: '1 tsp (2-3g)',
    description: 'Robust and mineral-rich with deep, roasted notes. For experienced practitioners.',
    color: 'from-orange-600 to-red-600',
    brewingNotes: 'Quick rinse enhances later steeps. Robust mineral character develops over multiple infusions.',
    gongfu: {
      temperature: 93,
      firstSteepTime: 12,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 12,
      rinseRequired: true,
      rinseTime: 4,
      rinseCount: 1,
      notes: 'Wuyi Rock Tea, Da Hong Pao varieties. Rich mineral complexity'
    }
  },
  {
    id: 'white',
    name: 'White Tea',
    category: 'white',
    temperature: 82,
    steepTime: 240,
    teaAmount: '2 tsp (3-4g)',
    description: 'Subtle and gentle with delicate floral notes. Perfect for evening reflection.',
    color: 'from-gray-100 to-gray-200',
    brewingNotes: 'Use lower temperatures for young white teas. Aged whites can handle slightly hotter water.',
    gongfu: {
      temperature: 82,
      firstSteepTime: 15,
      teaAmount: '5-6g per 100ml',
      maxInfusions: 8,
      rinseRequired: false,
      notes: 'Bai Mu Dan, Silver Needle varieties. Delicate and floral'
    }
  },
  {
    id: 'puer-raw',
    name: 'Raw Pu-erh (Sheng)',
    category: 'puer',
    temperature: 87,
    steepTime: 180,
    teaAmount: '1 tsp (3-4g)',
    description: 'Complex and evolving with astringent youth or smooth aged character.',
    color: 'from-green-700 to-yellow-600',
    brewingNotes: 'Young raw pu-erh can be astringent; aged ones are smoother. Always rinse to "wake" the leaves.',
    gongfu: {
      temperature: 87,
      firstSteepTime: 8,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 15,
      rinseRequired: true,
      rinseTime: 4,
      rinseCount: 1,
      notes: 'High-quality raw pu-erh can steep many times. Watch flavors evolve'
    }
  },
  {
    id: 'puer-ripe',
    name: 'Ripe Pu-erh (Shou)',
    category: 'puer',
    temperature: 93,
    steepTime: 180,
    teaAmount: '1 tsp (3-4g)',
    description: 'Earthy and smooth with deep, mellow complexity.',
    color: 'from-red-800 to-red-900',
    brewingNotes: 'Double rinse recommended to mellow the earthy flavors.',
    gongfu: {
      temperature: 93,
      firstSteepTime: 8,
      teaAmount: '7-8g per 100ml',
      maxInfusions: 12,
      rinseRequired: true,
      rinseTime: 4,
      rinseCount: 2,
      notes: 'Earthy and smooth. Double rinse mellows the flavor beautifully'
    }
  },
  {
    id: 'yellow',
    name: 'Yellow Tea',
    category: 'yellow',
    temperature: 77,
    steepTime: 240,
    teaAmount: '1 tsp (2-3g)',
    description: 'Rare and lightly fermented with mellow, sweet character.',
    color: 'from-yellow-200 to-yellow-400',
    brewingNotes: 'Similar to green tea but mellower. Use gentle heat to preserve delicate flavors.',
    gongfu: {
      temperature: 77,
      firstSteepTime: 12,
      teaAmount: '5-6g per 100ml',
      maxInfusions: 6,
      rinseRequired: false,
      notes: 'Jun Shan Yin Zhen variety. Rare and precious with subtle complexity'
    }
  }
];

export const getTeaById = (id: string): TeaType | undefined => {
  return teaTypes.find(tea => tea.id === id);
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32);
};

export const formatTemperature = (celsius: number): string => {
  const fahrenheit = celsiusToFahrenheit(celsius);
  return `${celsius}°C (${fahrenheit}°F)`;
};
