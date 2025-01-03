import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star } from "lucide-react";

interface LeaderboardProps {
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
}

const Leaderboard = ({ globalRankings = [], courseRankings = [] }: LeaderboardProps) => {
  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
      <div className="flex gap-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Global</button>
        <button className="text-gray-400 px-4 py-1 rounded-full text-sm">Course</button>
      </div>
      {/* Add leaderboard content here */}
    </div>
  );
};

export default Leaderboard;
