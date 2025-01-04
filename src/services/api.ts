import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const API_ENDPOINTS = {
  // Course endpoints
  getCourses: () => '/courses',
  getCourse: (id: number) => `/courses/${id}`,
  getCourseProgress: (id: number) => `/courses/${id}/progress`,
  
  // Lesson endpoints
  getLesson: (id: number) => `/lessons/${id}`,
  updateLessonProgress: (id: number) => `/lessons/${id}/progress`,
  
  // Achievement endpoints
  getAchievements: () => '/achievements',
  getUserAchievements: () => '/user/achievements',
  
  // Progress endpoints
  getDailyStreak: () => '/progress/streak',
  getXPProgress: () => '/progress/xp',
  
  // Practice endpoints
  submitPronunciation: (lessonId: number) => `/lessons/${lessonId}/pronunciation`,
  getAudioFeedback: (recordingId: number) => `/audio-feedback/${recordingId}`
};

export default API_ENDPOINTS; 