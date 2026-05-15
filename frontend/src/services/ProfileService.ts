import { api } from './api';

export interface ProfileResponse {
  id: string;
  fullName: string;
  birthDate?: string;
  gender?: string;
  heightCm?: number;
  weightKg?: number;
  chronicCondition?: string;
}

export const ProfileService = {
  getProfile: async (): Promise<ProfileResponse | null> => {
    try {
      const response = await api.get('/profile');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching profile', error);
      return null;
    }
  },

  updateProfile: async (data: Partial<ProfileResponse>) => {
    const response = await api.patch('/profile', data);
    return response.data;
  }
};
