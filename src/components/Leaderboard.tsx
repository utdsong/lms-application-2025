import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, Zap } from 'lucide-react';
import { echo } from '../lib/echo';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  change: 'up' | 'down' | 'same';
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    loadLeaderboard();
    subscribeToUpdates();
  }, [timeframe]);

  const loadLeaderboard = async () => {
    try {
      const response = await fetch(`/api/leaderboard/${timeframe}`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  const subscribeToUpdates = () => {
    echo.channel('leaderboard')
      .listen('LeaderboardUpdated', (e: any) => {
        setEntries(prevEntries => {
          const newEntries = [...prevEntries];
          const index = newEntries.findIndex(entry => entry.id === e.userId);
          
          if (index !== -1) {
            newEntries[index] = {
              ...newEntries[index],
              points: e.newPoints,
              change: e.newPoints > newEntries[index].points ? 'up' : 'down'
            };
          }
          
          return newEntries.sort((a, b) => b.points - a.points)
            .map((entry, i) => ({ ...entry, rank: i + 1 }));
        });
      });

    return () => {
      echo.leave('leaderboard');
    };
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-gray-400 font-mono">{rank}</span>;
    }
  };

  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-lg text-sm ${
                timeframe === t 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-lg"
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-10 h-10 rounded-full"
              />
              
              <div className="flex-1">
                <h3 className="font-medium text-white">{entry.name}</h3>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">{entry.points} XP</span>
                </div>
              </div>

              {entry.change !== 'same' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    entry.change === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  <motion.div
                    animate={{ y: entry.change === 'up' ? -2 : 2 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    {entry.change === 'up' ? '↑' : '↓'}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 