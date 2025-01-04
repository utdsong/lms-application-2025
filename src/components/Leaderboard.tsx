import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { mockLeaderboardData } from '../services/mockData';

export function Leaderboard() {
  const [view, setView] = useState<'global' | 'course'>('global');
  const entries = mockLeaderboardData[view];

  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setView('global')}
          className={`px-4 py-1 rounded-full text-sm ${
            view === 'global' 
              ? 'bg-white text-[#1B2333]' 
              : 'text-gray-400'
          }`}
        >
          Global
        </button>
        <button 
          onClick={() => setView('course')}
          className={`px-4 py-1 rounded-full text-sm ${
            view === 'course' 
              ? 'bg-white text-[#1B2333]' 
              : 'text-gray-400'
          }`}
        >
          Course
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-[#0B1120] rounded-lg"
          >
            <div className="flex items-center gap-3">
              {index < 3 ? (
                <Medal className={`w-5 h-5 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-orange-500'
                }`} />
              ) : (
                <span className="w-5 text-center text-gray-400">{index + 1}</span>
              )}
              <img 
                src={entry.avatar} 
                alt={entry.name} 
                className="w-8 h-8 rounded-full"
              />
              <span>{entry.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{entry.points} pts</span>
              {entry.change !== 'same' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    entry.change === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {entry.change === 'up' ? '↑' : '↓'}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 