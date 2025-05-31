
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface SessionMindfulnessProps {
  stage: 'heating' | 'steeping';
  theme: string;
  steepNumber: number;
}

interface MindfulnessPrompt {
  title: string;
  instruction: string;
  prompts: string[];
}

const mindfulnessPrompts: Record<string, MindfulnessPrompt> = {
  'Focus on Aroma': {
    title: 'Aromatic Awareness',
    instruction: 'Allow your senses to be fully present with the emerging aromas.',
    prompts: [
      'Notice the first hints of aroma rising from your cup',
      'How does the scent change as the tea steeps?',
      'What memories or feelings does this aroma evoke?',
      'Breathe deeply and let the fragrance fill your awareness'
    ]
  },
  'Breathing Awareness': {
    title: 'Mindful Breathing',
    instruction: 'Synchronize your breath with the rhythm of brewing.',
    prompts: [
      'Feel your breath naturally slow as the tea steeps',
      'Notice the pause between inhale and exhale',
      'How does your breathing affect your state of mind?',
      'Let each breath bring you deeper into presence'
    ]
  },
  'Gratitude Practice': {
    title: 'Tea Gratitude',
    instruction: 'Cultivate appreciation for this moment and this tea.',
    prompts: [
      'Feel grateful for the leaves that traveled to reach you',
      'Appreciate the hands that picked and processed this tea',
      'What are you thankful for in this quiet moment?',
      'Send gratitude to the earth that nurtured these leaves'
    ]
  },
  'Present Moment': {
    title: 'Pure Presence',
    instruction: 'Rest in simple awareness of what is happening now.',
    prompts: [
      'What do you notice in this exact moment?',
      'Feel the weight of the teacup in your hands',
      'Notice any thoughts without following them',
      'Simply be here, now, with your tea'
    ]
  },
  'Color and Clarity': {
    title: 'Visual Meditation',
    instruction: 'Let your eyes rest softly on the tea\'s appearance.',
    prompts: [
      'Watch the color deepen as the tea steeps',
      'Notice the clarity or cloudiness of the brew',
      'How does the tea\'s appearance affect your anticipation?',
      'Let your gaze be soft and receptive'
    ]
  },
  'Warmth and Comfort': {
    title: 'Embodied Comfort',
    instruction: 'Feel the warmth and comfort this ritual brings.',
    prompts: [
      'Notice the warmth spreading through your hands',
      'How does this ritual comfort your body and mind?',
      'Feel yourself settling into this peaceful moment',
      'Let warmth and comfort fill your entire being'
    ]
  }
};

export const SessionMindfulness: React.FC<SessionMindfulnessProps> = ({
  stage,
  theme,
  steepNumber
}) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const prompt = mindfulnessPrompts[theme] || mindfulnessPrompts['Present Moment'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex(prev => (prev + 1) % prompt.prompts.length);
    }, 12000); // Change prompt every 12 seconds

    return () => clearInterval(interval);
  }, [prompt.prompts.length]);

  useEffect(() => {
    // Breathing pattern: 4s inhale, 2s hold, 6s exhale
    const breathingCycle = () => {
      setBreathPhase('inhale');
      setTimeout(() => {
        setBreathPhase('hold');
        setTimeout(() => {
          setBreathPhase('exhale');
        }, 2000);
      }, 4000);
    };

    const interval = setInterval(breathingCycle, 12000); // 12 second cycles
    breathingCycle(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
          <span className="text-2xl">🧘‍♀️</span>
        </div>
        <h3 className="text-lg font-light text-tea-earth mb-2">
          {prompt.title}
        </h3>
        <p className="text-tea-stone text-sm">
          Steep {steepNumber} • {prompt.instruction}
        </p>
      </div>

      {/* Breathing Guide */}
      <div className="mb-6">
        <div className="text-center mb-4">
          <div className={`w-20 h-20 mx-auto rounded-full border-4 transition-all duration-1000 ${
            breathPhase === 'inhale' ? 'border-tea-sage scale-110' :
            breathPhase === 'hold' ? 'border-tea-earth scale-110' :
            'border-tea-stone scale-90'
          }`}>
            <div className={`w-full h-full rounded-full transition-all duration-1000 ${
              breathPhase === 'inhale' ? 'bg-tea-sage/30 animate-breathe' :
              breathPhase === 'hold' ? 'bg-tea-earth/30' :
              'bg-tea-stone/20'
            }`} />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-light text-tea-earth capitalize mb-2">
            {breathPhase}
          </p>
          <div className="text-sm text-tea-stone">
            Inhale 4s • Hold 2s • Exhale 6s
          </div>
        </div>
      </div>

      {/* Mindfulness Prompt */}
      <div className="bg-tea-sage/10 rounded-lg p-4 text-center">
        <p className="text-sm text-tea-stone mb-2">Reflect:</p>
        <p className="text-tea-earth font-light transition-all duration-500">
          {prompt.prompts[currentPromptIndex]}
        </p>
      </div>

      {/* Stage-specific guidance */}
      <div className="mt-4 text-center text-xs text-tea-stone">
        {stage === 'heating' && '🔥 As the water warms, let your awareness settle'}
        {stage === 'steeping' && '⏳ During this steep, rest in mindful observation'}
      </div>
    </Card>
  );
};
