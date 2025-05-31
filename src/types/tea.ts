
export interface GongfuParams {
  temperature: number;
  firstSteepTime: number;
  teaAmount: string;
  maxInfusions: number;
  rinseRequired?: boolean;
  rinseTime?: number;
  rinseCount?: number;
  notes?: string;
}

export interface TeaType {
  id: string;
  name: string;
  temperature: number;
  steepTime: number;
  teaAmount: string;
  description: string;
  color: string;
  gongfu?: GongfuParams;
  category: 'green' | 'black' | 'oolong' | 'white' | 'puer' | 'yellow' | 'herbal';
  brewingNotes?: string;
}

export type BrewingStyle = 'western' | 'gongfu';
