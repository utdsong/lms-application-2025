export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  lessons: Lesson[];
  challenges: GameChallenge[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  order: number;
  content: LessonContent[];
}

export interface LessonContent {
  id: string;
  type: 'text' | 'video' | 'code' | 'image';
  title: string;
  content: string;
  description?: string;
  order: number;
}

export interface GameChallenge {
  id: string;
  title: string;
  type: 'quiz' | 'code' | 'puzzle';
  content: QuizContent | CodeContent | PuzzleContent;
  points: number;
}

export interface QuizContent {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
}

export interface CodeContent {
  instructions: string;
  initialCode: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface PuzzleContent {
  instructions: string;
  pieces: {
    id: string;
    content: string;
    correctPosition: number;
  }[];
} 