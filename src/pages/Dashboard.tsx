import { LearningStats } from '../components/dashboard/LearningStats';
import { RecentAchievements } from '../components/dashboard/RecentAchievements';
import { Leaderboard } from '../components/leaderboard/Leaderboard';
import { DailyChallenge } from '../components/challenge/DailyChallenge';
import { CourseList } from '../components/course/CourseList';

export function Dashboard() {
  return (
    <div className="space-y-8">
      <LearningStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-white">Your Courses</h2>
          <CourseList />
        </div>
        
        <div>
          <Leaderboard />
        </div>
      </div>

      {/* Recent Achievements - Full Width */}
      <div className="w-full">
        <RecentAchievements />
      </div>
      
      {/* Daily Challenge */}
      <DailyChallenge />
    </div>
  );
} 