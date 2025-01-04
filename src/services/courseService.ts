import api from './api';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  points_multiplier: number;
  challenges: Challenge[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: 'quick' | 'battle' | 'daily';
  time_limit: number;
  points_value: number;
  difficulty_level: string;
}

export const courseService = {
  getAllCourses: async () => {
    const response = await api.get<Course[]>('/courses');
    return response.data;
  },

  getCourseDetails: async (courseId: string) => {
    const response = await api.get<Course>(`/courses/${courseId}`);
    return response.data;
  },

  getUserProgress: async () => {
    const response = await api.get('/user/progress');
    return response.data;
  }
}; 