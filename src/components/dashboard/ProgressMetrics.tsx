import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Award } from "lucide-react";

interface ProgressMetricsProps {
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
}

const ProgressMetrics = ({
  rank = "Gold Scholar",
  level = 15,
  totalPoints = 2500,
  streak = 7,
  badges = [
    { id: "1", name: "Quick Learner", icon: "trophy", achieved: true },
    { id: "2", name: "Problem Solver", icon: "star", achieved: true },
    { id: "3", name: "Team Player", icon: "award", achieved: false },
  ],
}: ProgressMetricsProps) => {
  return (
    <div className="w-full h-[200px] bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Rank/Level Card */}
        <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500 animate-pulse" />
            <h3 className="font-semibold text-white">Rank</h3>
          </div>
          <div>
            <p className="text-xl font-bold text-white">{rank}</p>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Level {level}</span>
                <span>{level * 100}/1000</span>
              </div>
              <Progress value={75} className="h-2 bg-slate-600" />
            </div>
          </div>
        </Card>

        {/* Total Points Card */}
        <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-white">Total Points</h3>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400 animate-pulse">
              {totalPoints}
            </p>
            <p className="text-sm text-gray-400">XP Earned</p>
          </div>
        </Card>

        {/* Streak Card */}
        <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold text-white">Active Streak</h3>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">{streak} Days</p>
            <p className="text-sm text-gray-400">Keep it up!</p>
          </div>
        </Card>

        {/* Badges Card */}
        <Card className="p-4 flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-white">Recent Badges</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge) => (
              <Badge
                key={badge.id}
                variant={badge.achieved ? "default" : "outline"}
                className={`${badge.achieved ? "bg-gradient-to-r from-purple-500 to-purple-700" : "text-gray-400"} cursor-pointer transform hover:scale-110 transition-all duration-200`}
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressMetrics;
