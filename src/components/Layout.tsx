import { ReactNode } from 'react';
import { Trophy, Star, Flame } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">Learning Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Rank Card */}
          <div className="bg-[#1B2333] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="text-sm text-gray-400">Rank</h3>
            </div>
            <p className="text-xl font-bold">Gold Scholar</p>
            <div className="flex justify-between text-sm mt-2">
              <span>Level 15</span>
              <span className="text-gray-400">1500/1000</span>
            </div>
          </div>

          {/* Total Points Card */}
          <div className="bg-[#1B2333] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm text-gray-400">Total Points</h3>
            </div>
            <p className="text-2xl font-bold text-blue-400">2500</p>
            <p className="text-sm text-gray-400 mt-2">XP Earned</p>
          </div>

          {/* Active Streak Card */}
          <div className="bg-[#1B2333] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-sm text-gray-400">Active Streak</h3>
            </div>
            <p className="text-2xl font-bold text-orange-400">7 Days</p>
            <p className="text-sm text-gray-400 mt-2">Keep it up!</p>
          </div>

          {/* Recent Badges Card */}
          <div className="bg-[#1B2333] rounded-xl p-6">
            <h3 className="text-sm text-gray-400 mb-3">Recent Badges</h3>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-sm">Quick Learner</span>
              <span className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-sm">Problem Solver</span>
              <span className="px-3 py-1 bg-gray-500/30 text-gray-400 rounded-full text-sm">Team Player</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Active Courses Section */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Courses</h2>
                <a href="#" className="text-blue-600 hover:text-blue-700">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children}
              </div>
            </div>

            {/* Achievement Center */}
            <div className="bg-[#1B2333] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold">Achievement Center</h2>
              </div>
              <p className="text-gray-400 mb-6">Track your progress and unlock new achievements</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Achievement Cards */}
                <div className="bg-[#1B2333] border border-yellow-500/20 rounded-lg p-4 text-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">First Steps</h3>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Unlocked</span>
                </div>
                {/* Add more achievement cards as needed */}
              </div>
            </div>
          </div>

          {/* Right Sidebar (1 column) - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-[#1B2333] rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
              <div className="flex gap-2 mb-6">
                <button className="bg-white text-[#1B2333] px-4 py-1 rounded-full text-sm font-medium">Global</button>
                <button className="text-gray-400 px-4 py-1 rounded-full text-sm">Course</button>
              </div>
              {/* Add leaderboard entries here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 