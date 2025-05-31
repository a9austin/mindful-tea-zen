
export interface TeaSession {
  id: string;
  name: string;
  teaType: string;
  totalSteeps: number;
  currentSteep: number;
  steepTimes: number[]; // in seconds
  waterTemperature: number;
  mindfulnessEnabled: boolean;
  mindfulnessTheme: string;
  status: 'preparing' | 'heating' | 'steeping' | 'paused' | 'completed';
  startedAt: Date;
  lastActiveAt: Date;
  notes?: string;
  progress: {
    completedSteeps: number[];
    currentStepStartTime?: Date;
  };
}

export interface SessionContextType {
  sessions: TeaSession[];
  activeSessionId: string | null;
  createSession: (sessionData: Omit<TeaSession, 'id' | 'startedAt' | 'lastActiveAt' | 'progress'>) => void;
  updateSession: (id: string, updates: Partial<TeaSession>) => void;
  deleteSession: (id: string) => void;
  setActiveSession: (id: string | null) => void;
  pauseSession: (id: string) => void;
  resumeSession: (id: string) => void;
}
