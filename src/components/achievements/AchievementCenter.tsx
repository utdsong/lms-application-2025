import { Trophy, Lock } from 'lucide-react';

export function AchievementCenter() {
  return (
    <div className="min-h-screen bg-[#0B1120] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold text-white">Achievement Center</h1>
            <p className="text-gray-400 text-lg">
              Track your progress and unlock new achievements
            </p>
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* First Steps - Unlocked */}
          <div className="bg-[#1B2333] rounded-xl p-6 border border-yellow-500/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">First Steps</h3>
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                Unlocked
              </span>
            </div>
          </div>

          {/* Quick Learner - Locked */}
          <div className="bg-gray-700/20 rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Quick Learner</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div className="bg-gray-500 h-full rounded-full w-1/3" />
              </div>
            </div>
          </div>

          {/* Streak Master - Locked */}
          <div className="bg-gray-700/20 rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Streak Master</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div className="bg-gray-500 h-full rounded-full w-1/4" />
              </div>
            </div>
          </div>

          {/* Knowledge Seeker - Locked */}
          <div className="bg-gray-700/20 rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Knowledge Seeker</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div className="bg-gray-500 h-full rounded-full w-1/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 