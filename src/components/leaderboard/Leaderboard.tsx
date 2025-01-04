import { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';
import api from '../../services/api';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_points: number;
  rank: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'global' | 'course'>('global');

  useEffect(() => {
    loadLeaderboard();
  }, [view]);

  const loadLeaderboard = async () => {
    try {
      const response = await api.get(`/leaderboard/${view}`);
      setEntries(response.data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div
              key={entry.user_id}
              className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg"
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
                <span>{entry.username}</span>
              </div>
              <span className="text-gray-400">{entry.total_points} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 