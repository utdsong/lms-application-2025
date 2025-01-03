import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trophy } from "lucide-react";

interface CourseCardProps {
  title?: string;
  image?: string;
  progress?: number;
  nextChallenge?: string;
  xpPoints?: number;
}

const CourseCard = ({
  title = "Introduction to Programming",
  image = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
  progress = 45,
  nextChallenge = "Complete Variables Quiz",
  xpPoints = 100,
}: CourseCardProps) => {
  return (
    <Card className="w-[350px] h-[280px] bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 border border-slate-700">
      <CardHeader className="p-0">
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 animate-pulse">
            <Trophy className="h-4 w-4 text-white animate-spin-slow" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-300">Next Challenge:</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                {nextChallenge}
              </span>
              <div className="flex items-center gap-1 text-sm text-blue-400">
                <span>{xpPoints} XP</span>
                <ChevronRight className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none hover:from-blue-600 hover:to-blue-800"
            onClick={() => console.log("Continue course clicked")}
          >
            Continue Course
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
