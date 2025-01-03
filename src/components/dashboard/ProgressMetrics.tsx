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

const ProgressMetrics = ({ rank = "Gold Scholar", level = 1, totalPoints = 0, streak = 0, badges = [] }: ProgressMetricsProps) => {
  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <div className="flex items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Rank</h3>
          <p className="text-2xl font-bold text-white">{rank}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressMetrics;
