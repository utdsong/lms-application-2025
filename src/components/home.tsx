import React from "react";
import ProgressMetrics from "./dashboard/ProgressMetrics";
import ActiveCourses from "./dashboard/ActiveCourses";
import Leaderboard from "./dashboard/Leaderboard";
import AchievementCenter from "./dashboard/AchievementCenter";
import { Trophy } from "lucide-react";

interface HomeProps {
  studentData?: {
    rank?: string;
    level?: number;
    totalPoints?: number;
    streak?: number;
    badges?: Array<{
      id: string;
      name: string;
      icon: string;
      achieved: boolean;
    }>;
  };
  courses?: Array<{
    id: string;
    title: string;
    image: string;
    progress: number;
    nextChallenge: string;
    xpPoints: number;
  }>;
  leaderboard?: {
    globalRankings?: Array<{
      id: number;
      name: string;
      points: number;
      rank: number;
      avatar: string;
    }>;
    courseRankings?: Array<{
      id: number;
      name: string;
      points: number;
      rank: number;
      avatar: string;
    }>;
  };
  achievements?: Array<{
    id: string;
    name: string;
    description: string;
    progress: number;
    unlocked: boolean;
    icon: "Trophy" | "Star" | "Award" | "Medal";
  }>;
}

const Home = ({
  studentData,
  courses,
  leaderboard,
  achievements,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" /> Learning Dashboard
        </h1>

        <div className="space-y-8">
          {/* Progress Metrics Section */}
          <section>
            <ProgressMetrics
              rank={studentData?.rank}
              level={studentData?.level}
              totalPoints={studentData?.totalPoints}
              streak={studentData?.streak}
              badges={studentData?.badges}
            />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Courses and Achievement Center (Left and Center) */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <ActiveCourses courses={courses} />
              </section>

              <section>
                <AchievementCenter achievements={achievements} />
              </section>
            </div>

            {/* Leaderboard (Right) */}
            <div className="lg:col-span-1">
              <section>
                <Leaderboard
                  globalRankings={leaderboard?.globalRankings}
                  courseRankings={leaderboard?.courseRankings}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
