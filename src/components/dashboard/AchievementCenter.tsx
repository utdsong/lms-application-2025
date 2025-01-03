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

interface AchievementCenterProps {
  achievements?: Array<{
    id: string;
    name: string;
    description: string;
    progress: number;
    unlocked: boolean;
    icon: "Trophy" | "Star" | "Award" | "Medal";
  }>;
}

const AchievementCenter = ({ achievements = [] }: AchievementCenterProps) => {
  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Achievement Center</h2>
      {/* Add achievement content here */}
    </div>
  );
};

export default AchievementCenter;
