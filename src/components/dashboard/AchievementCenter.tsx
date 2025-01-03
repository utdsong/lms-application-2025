import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Star, Award, Medal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  unlocked: boolean;
  icon: keyof typeof iconMap;
}

interface AchievementCenterProps {
  achievements?: Achievement[];
}

const iconMap = {
  Trophy,
  Star,
  Award,
  Medal,
};

const defaultAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first lesson",
    progress: 100,
    unlocked: true,
    icon: "Trophy",
  },
  {
    id: "2",
    name: "Quick Learner",
    description: "Complete 5 lessons in one day",
    progress: 60,
    unlocked: false,
    icon: "Star",
  },
  {
    id: "3",
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    progress: 30,
    unlocked: false,
    icon: "Award",
  },
  {
    id: "4",
    name: "Knowledge Seeker",
    description: "Earn 1000 XP points",
    progress: 0,
    unlocked: false,
    icon: "Medal",
  },
];

const AchievementCenter = ({
  achievements = defaultAchievements,
}: AchievementCenterProps) => {
  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" /> Achievement Center
        </h2>
        <p className="text-gray-300">
          Track your progress and unlock new achievements
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <TooltipProvider key={achievement.id}>
            <Tooltip>
              <TooltipTrigger>
                <Card
                  className={`relative overflow-hidden transform hover:scale-105 transition-all duration-200 ${achievement.unlocked ? "bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-yellow-500/20" : "bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/20"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center space-y-3">
                      <div
                        className={`p-3 rounded-full ${achievement.unlocked ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : "bg-gradient-to-br from-slate-600 to-slate-700"}`}
                      >
                        {achievement.unlocked ? (
                          React.createElement(iconMap[achievement.icon], {
                            className: "w-6 h-6 text-white animate-pulse",
                          })
                        ) : (
                          <Lock className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold mb-1 text-white">
                          {achievement.name}
                        </h3>
                        {achievement.unlocked ? (
                          <Badge
                            variant="default"
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white"
                          >
                            Unlocked
                          </Badge>
                        ) : (
                          <Progress
                            value={achievement.progress}
                            className="h-2 w-24 bg-slate-700"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{achievement.description}</p>
                {!achievement.unlocked && (
                  <p className="text-sm text-gray-400">
                    {achievement.progress}% Complete
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default AchievementCenter;
