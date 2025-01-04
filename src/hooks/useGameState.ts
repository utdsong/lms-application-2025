import { useState, useEffect } from 'react';
import { GameConfig, GameResult } from '../types/course';

export function useGameState(config: GameConfig) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [lives, setLives] = useState(config.lives || 3);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'paused' | 'completed'>('ready');
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    let timer: number;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setGameState('completed');
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const addScore = (points: number) => {
    setScore(current => current + points);
    checkAchievements(current => current + points);
  };

  const loseLife = () => {
    setLives(current => {
      if (current <= 1) {
        setGameState('completed');
        return 0;
      }
      return current - 1;
    });
  };

  const checkAchievements = (newScore: number) => {
    config.achievements?.forEach(achievement => {
      if (newScore >= achievement.threshold && !achievements.includes(achievement.id)) {
        setAchievements(current => [...current, achievement.id]);
      }
    });
  };

  const getResult = (): GameResult => ({
    score,
    timeSpent: config.timeLimit - timeLeft,
    livesLeft: lives,
    achievements,
    completed: gameState === 'completed'
  });

  return {
    score,
    timeLeft,
    lives,
    gameState,
    achievements,
    addScore,
    loseLife,
    setGameState,
    getResult
  };
} 