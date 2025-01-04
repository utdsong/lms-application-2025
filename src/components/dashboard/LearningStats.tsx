import { Trophy, Star, Flame, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function LearningStats() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBadgeClick = (badgeId: string) => {
    navigate(`/achievements/${badgeId}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.username}!</h1>
        <p className="text-gray-400 text-lg">Continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Rank Card */}
        <div className="bg-[#1d283a] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-white text-sm">Rank</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Gold Scholar</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Level 15</span>
            <span className="text-gray-400 text-sm">1500/1000</span>
          </div>
          <div className="w-full bg-[#1B2333] h-1.5 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Total Points Card */}
        <div className="bg-[#1d283a] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="text-white text-sm">Total Points</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#4B9CFF]">2500</h3>
            <p className="text-gray-400 text-sm">XP Earned</p>
          </div>
        </div>

        {/* Active Streak Card */}
        <div className="bg-[#1d283a] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-white text-sm">Active Streak</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#FF9F4B]">7 Days</h3>
            <p className="text-gray-400 text-sm">Keep it up!</p>
          </div>
        </div>

        {/* Recent Badges Card */}
        <div className="bg-[#1d283a] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-purple-500" />
            <span className="text-white text-sm">Recent Badges</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['quick-learner', 'problem-solver', 'team-player'].map((badgeId, index) => (
              <button
                key={badgeId}
                onClick={() => handleBadgeClick(badgeId)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${index === 0 ? 'bg-purple-500 hover:bg-purple-600' :
                    index === 1 ? 'bg-blue-500 hover:bg-blue-600' :
                    'bg-[#1B2333] hover:bg-[#252f44]'}
                  text-white`}
              >
                {badgeId.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 