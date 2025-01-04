import { useState } from 'react';
import { motion } from 'framer-motion';
import { MemoryGame } from '../components/games/MemoryGame';
import { QuizGame } from '../components/games/QuizGame';
import { SortingGame } from '../components/games/SortingGame';
import { CodeChallenge } from '../components/games/CodeChallenge';
import { GameSelector } from '../components/games/GameSelector';
import { useGameProgress } from '../hooks/useGameProgress';

export function GameCenter() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const { progress, updateProgress } = useGameProgress();

  const handleGameComplete = (result: any) => {
    updateProgress(selectedGame!, result);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Game Center</h1>
        <p className="text-gray-400">Practice and improve your skills through interactive games</p>
      </header>

      {!selectedGame ? (
        <GameSelector onSelect={setSelectedGame} progress={progress} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedGame}</h2>
            <button
              onClick={() => setSelectedGame(null)}
              className="px-4 py-2 bg-secondary rounded-lg"
            >
              Back to Games
            </button>
          </div>

          {/* Game Components */}
          {selectedGame === 'memory' && (
            <MemoryGame
              config={memoryGameConfig}
              onComplete={handleGameComplete}
            />
          )}
          {selectedGame === 'quiz' && (
            <QuizGame
              config={quizGameConfig}
              onComplete={handleGameComplete}
            />
          )}
          {selectedGame === 'sorting' && (
            <SortingGame
              config={sortingGameConfig}
              onComplete={handleGameComplete}
            />
          )}
          {selectedGame === 'code' && (
            <CodeChallenge
              config={codeGameConfig}
              onComplete={handleGameComplete}
            />
          )}
        </motion.div>
      )}
    </div>
  );
} 