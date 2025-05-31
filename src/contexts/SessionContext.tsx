
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeaSession, SessionContextType } from '@/types/session';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<TeaSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('tea-sessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        startedAt: new Date(session.startedAt),
        lastActiveAt: new Date(session.lastActiveAt),
        progress: {
          ...session.progress,
          currentStepStartTime: session.progress.currentStepStartTime 
            ? new Date(session.progress.currentStepStartTime) 
            : undefined
        }
      }));
      setSessions(parsedSessions);
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('tea-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const createSession = (sessionData: Omit<TeaSession, 'id' | 'startedAt' | 'lastActiveAt' | 'progress'>) => {
    const newSession: TeaSession = {
      ...sessionData,
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startedAt: new Date(),
      lastActiveAt: new Date(),
      progress: {
        completedSteeps: []
      }
    };
    
    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const updateSession = (id: string, updates: Partial<TeaSession>) => {
    setSessions(prev => prev.map(session => 
      session.id === id 
        ? { ...session, ...updates, lastActiveAt: new Date() }
        : session
    ));
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const setActiveSession = (id: string | null) => {
    setActiveSessionId(id);
    if (id) {
      updateSession(id, { lastActiveAt: new Date() });
    }
  };

  const pauseSession = (id: string) => {
    updateSession(id, { status: 'paused' });
  };

  const resumeSession = (id: string) => {
    updateSession(id, { status: 'preparing' });
  };

  return (
    <SessionContext.Provider value={{
      sessions,
      activeSessionId,
      createSession,
      updateSession,
      deleteSession,
      setActiveSession,
      pauseSession,
      resumeSession
    }}>
      {children}
    </SessionContext.Provider>
  );
};
