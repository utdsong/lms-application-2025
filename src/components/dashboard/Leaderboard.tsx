import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star } from "lucide-react";

interface LeaderboardEntry {
  id: number;
  name: string;
  points: number;
  rank: number;
  avatar: string;
}

interface LeaderboardProps {
  globalRankings?: LeaderboardEntry[];
  courseRankings?: LeaderboardEntry[];
}

const defaultGlobalRankings: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    points: 2500,
    rank: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: 2,
    name: "Mike Chen",
    points: 2350,
    rank: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
  },
  {
    id: 3,
    name: "Emma Wilson",
    points: 2200,
    rank: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
];

const defaultCourseRankings: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Alex Turner",
    points: 850,
    rank: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    id: 2,
    name: "Lisa Park",
    points: 820,
    rank: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
  },
  {
    id: 3,
    name: "James Miller",
    points: 780,
    rank: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
  },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <Star className="h-5 w-5 text-blue-500" />;
};

const LeaderboardList = ({ entries }: { entries: LeaderboardEntry[] }) => (
  <div className="space-y-4">
    {entries.map((entry) => (
      <div
        key={entry.id}
        className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border border-slate-700 transform hover:scale-105 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8">
            <RankIcon rank={entry.rank} className="animate-pulse" />
          </div>
          <Avatar>
            <AvatarImage src={entry.avatar} />
            <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{entry.name}</span>
        </div>
        <div className="text-right text-blue-400">
          <span className="font-bold text-primary">{entry.points}</span>
          <span className="text-gray-500 text-sm ml-1">pts</span>
        </div>
      </div>
    ))}
  </div>
);

const Leaderboard = ({
  globalRankings = defaultGlobalRankings,
  courseRankings = defaultCourseRankings,
}: LeaderboardProps) => {
  return (
    <Card className="w-[400px] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-700">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="course">Course</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <LeaderboardList entries={globalRankings} />
          </TabsContent>
          <TabsContent value="course">
            <LeaderboardList entries={courseRankings} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
