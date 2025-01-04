import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export function useProgress(courseId: number) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    completedLessons: 0,
    totalLessons: 0,
    currentStreak: 0,
    lastCompletedAt: null,
    xpGained: 0,
    level: 1
  });

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, courseId]);

  const loadProgress = async () => {
    try {
      const response = await api.get(`/courses/${courseId}/progress`);
      setProgress(response.data);
    } catch (err) {
      console.error('Failed to load progress:', err);
    }
  };

  const updateProgress = async (lessonId: number, data: any) => {
    try {
      await api.post(`/lessons/${lessonId}/progress`, data);
      await loadProgress();
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  return { progress, updateProgress };
} 