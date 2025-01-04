import { Trophy } from 'lucide-react';

export function RecentAchievements() {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">Recent Achievements</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* First Achievement Card */}
        <div className="bg-[#1B2333] rounded-xl p-5">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">First Steps</h3>
            <span className="px-2.5 py-1 bg-green-500 text-white rounded-full text-xs">
              Unlocked
            </span>
          </div>
        </div>

        {/* Locked Achievement Cards */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-gray-700/20 rounded-xl p-5">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-600/50 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-gray-400 mb-2">
                {['Quick Learner', 'Streak Master', 'Knowledge Seeker'][index]}
              </h3>
              <div className="w-full bg-gray-700 h-1.5 rounded-full">
                <div 
                  className="bg-gray-500 h-full rounded-full" 
                  style={{ width: `${[33, 25, 20][index]}%` }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 