import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface ProgressContextType {
  userProgress: {
    level: number;
    xp: number;
    totalXp: number;
    streak: number;
    badges: string[];
    completedLessons: number[];
  };
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState({
    level: 1,
    xp: 0,
    totalXp: 0,
    streak: 0,
    badges: [],
    completedLessons: [],
  });

  const refreshProgress = async () => {
    try {
      const response = await api.get('/user/progress');
      setUserProgress(response.data);
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
    }
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <ProgressContext.Provider value={{ userProgress, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 