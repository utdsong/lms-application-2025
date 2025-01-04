import { motion } from 'framer-motion';
import { Brain, Code, Puzzle, Sort } from 'lucide-react';

interface Props {
  onSelect: (game: string) => void;
  progress: Record<string, any>;
}

export function GameSelector({ onSelect, progress }: Props) {
  const games = [
    {
      id: 'memory',
      name: 'Memory Match',
      description: 'Test and improve your memory skills',
      icon: Brain,
      color: 'bg-blue-500',
    },
    {
      id: 'quiz',
      name: 'Quick Quiz',
      description: 'Challenge your knowledge',
      icon: Puzzle,
      color: 'bg-green-500',
    },
    {
      id: 'sorting',
      name: 'Sort & Order',
      description: 'Practice sorting algorithms',
      icon: Sort,
      color: 'bg-purple-500',
    },
    {
      id: 'code',
      name: 'Code Challenge',
      description: 'Solve coding problems',
      icon: Code,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <motion.button
          key={game.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(game.id)}
          className="bg-secondary rounded-xl p-6 text-left"
        >
          <div className={`${game.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
            <game.icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{game.description}</p>
          
          {progress[game.id] && (
            <div className="mt-4">
              <div className="text-sm text-gray-400">Best Score</div>
              <div className="text-xl font-bold">{progress[game.id].bestScore}</div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
} 