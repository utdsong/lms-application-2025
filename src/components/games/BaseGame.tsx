import { useState, useEffect } from 'react';
import { GameConfig, GameResult } from '../../types/course';
import { GameEngineService } from '../../services/GameEngineService';
import { Timer } from '../ui/Timer';
import { ScoreDisplay } from '../ui/ScoreDisplay';

interface Props {
  config: GameConfig;
  onComplete: (result: GameResult) => void;
}

export function BaseGame({ config, onComplete }: Props) {
  const [engine] = useState(() => new GameEngineService(config));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit || 60);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'paused' | 'completed'>('ready');

  useEffect(() => {
    engine.on('scoreUpdate', ({ score }) => setScore(score));
    engine.on('gameComplete', (result) => {
      setGameState('completed');
      onComplete(result);
    });

    return () => {
      // Cleanup
    };
  }, [engine, onComplete]);

  return (
    <div className="relative">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-4">
        <ScoreDisplay score={score} />
        <Timer 
          initialTime={timeLeft} 
          isRunning={gameState === 'playing'} 
          onComplete={() => engine.handleInteraction('timer', 'complete')} 
        />
      </div>

      {/* Game Content - To be implemented by specific games */}
      <div className="min-h-[400px] bg-secondary rounded-lg p-4">
        {children}
      </div>

      {/* Game Controls */}
      <div className="mt-4 flex justify-center gap-4">
        {gameState === 'ready' && (
          <button
            onClick={() => {
              setGameState('playing');
              engine.start();
            }}
            className="px-6 py-2 bg-accent rounded-lg"
          >
            Start Game
          </button>
        )}
        {gameState === 'playing' && (
          <button
            onClick={() => {
              setGameState('paused');
              engine.pause();
            }}
            className="px-6 py-2 bg-gray-600 rounded-lg"
          >
            Pause
          </button>
        )}
      </div>
    </div>
  );
} 