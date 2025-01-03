import React from "react";
import ProgressMetrics from "./dashboard/ProgressMetrics";
import Leaderboard from "./dashboard/Leaderboard";
import AchievementCenter from "./dashboard/AchievementCenter";
import { CourseCard } from "./CourseCard";
import { Trophy } from "lucide-react";

const coursesData = [
  {
    title: "Introduction to Programming",
    progress: 75,
    nextChallenge: "Complete Variables Quiz",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
    xp: 120
  },
  {
    title: "Web Development Basics",
    progress: 45,
    nextChallenge: "CSS Layouts Project",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
    xp: 90
  },
  {
    title: "Data Structures",
    progress: 25,
    nextChallenge: "Arrays and Lists",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=500",
    xp: 120
  }
];

const mockLeaderboardData = {
  globalRankings: [
    { id: 1, name: "Sarah Johnson", points: 2500, rank: 1, avatar: "avatar1.jpg" },
    { id: 2, name: "Mike Chen", points: 2350, rank: 2, avatar: "avatar2.jpg" },
    { id: 3, name: "Emma Wilson", points: 2200, rank: 3, avatar: "avatar3.jpg" }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Metrics Section */}
        <div className="mb-8">
          <ProgressMetrics 
            rank="Gold Scholar"
            level={15}
            totalPoints={2500}
            streak={7}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left and Center Content (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Active Courses Section */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Courses</h2>
                <a href="#" className="text-blue-600 hover:text-blue-700">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursesData.map((course, index) => (
                  <CourseCard
                    key={index}
                    title={course.title}
                    progress={course.progress}
                    nextChallenge={course.nextChallenge}
                    image={course.image}
                    xp={course.xp}
                  />
                ))}
              </div>
            </div>

            {/* Achievement Center */}
            <AchievementCenter />
          </div>

          {/* Right Sidebar (1 column) */}
          <div className="lg:col-span-1">
            <Leaderboard 
              globalRankings={mockLeaderboardData.globalRankings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
