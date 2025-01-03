import React from "react";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  image: string;
  progress: number;
  nextChallenge: string;
  xpPoints: number;
}

interface ActiveCoursesProps {
  courses?: Course[];
}

const ActiveCourses = ({
  courses = [
    {
      id: "1",
      title: "Introduction to Programming",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
      progress: 45,
      nextChallenge: "Complete Variables Quiz",
      xpPoints: 100,
    },
    {
      id: "2",
      title: "Web Development Basics",
      image:
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&q=80",
      progress: 70,
      nextChallenge: "CSS Layouts Project",
      xpPoints: 150,
    },
    {
      id: "3",
      title: "Data Structures",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80",
      progress: 25,
      nextChallenge: "Arrays and Lists",
      xpPoints: 120,
    },
  ],
}: ActiveCoursesProps) => {
  return (
    <div className="w-full min-h-[400px] bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Courses</h2>
          <button
            onClick={() => console.log("View all courses clicked")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              image={course.image}
              progress={course.progress}
              nextChallenge={course.nextChallenge}
              xpPoints={course.xpPoints}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveCourses;
