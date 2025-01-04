import { Calendar, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DailyChallenge() {
  const navigate = useNavigate();

  const handleChallengeClick = () => {
    navigate('/daily-challenge');
  };

  return (
    <button 
      onClick={handleChallengeClick}
      className="w-full bg-[#1B2333] rounded-xl p-5 shadow-lg shadow-blue-500/5 
        hover:bg-[#252f44] transition-colors text-left"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">Daily Challenge</h2>
        </div>
        <span className="text-xs text-gray-400">23h 59m remaining</span>
      </div>

      <p className="text-sm text-gray-300 mb-3">Complete 3 lessons today</p>

      <div className="bg-[#1d283a] rounded-full h-1.5 mb-3">
        <div 
          className="bg-blue-500 h-full rounded-full transition-all" 
          style={{ width: '33%' }} 
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-300">100 XP</span>
        </div>
        <span className="text-sm text-gray-400">1/3</span>
      </div>
    </button>
  );
} 