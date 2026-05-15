import { api } from './api';

export interface GoalResponse {
  id: string;
  metricType: number;
  targetValue: number;
  period: number;
  currentStreak: number;
  status: number;
}

export const GoalService = {
  getGoals: async (): Promise<GoalResponse[]> => {
    try {
      const response = await api.get('/goals');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching goals', error);
      return [];
    }
  }
};
