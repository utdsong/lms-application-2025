import api from './api';

export interface ChallengeAttempt {
  completion_time: number;
  success: boolean;
  points_earned: number;
}

export const challengeService = {
  attemptChallenge: async (challengeId: string, data: Omit<ChallengeAttempt, 'points_earned'>) => {
    const response = await api.post<ChallengeAttempt>(`/challenges/${challengeId}/attempt`, data);
    return response.data;
  }
}; 