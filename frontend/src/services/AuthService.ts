import { api } from './api';

export interface LoginResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export const AuthService = {
  register: async (gsm: string, password: string): Promise<any> => {
    try {
      const response = await api.post('/auth/register', { gsm, password, passwordConfirm: password });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { success: false, message: 'Kayıt olurken bir hata oluştu.' };
    }
  },

  verify: async (gsm: string, code: string): Promise<any> => {
    try {
      const response = await api.post('/auth/verify', { gsm, code });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { success: false, message: 'Doğrulama başarısız.' };
    }
  },

  login: async (gsm: string, otp: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', { gsm: gsm, password: otp });
      const apiRes = response.data;
      if (apiRes.success && apiRes.data) {
        return {
          success: true,
          accessToken: apiRes.data.accessToken,
          refreshToken: apiRes.data.refreshToken,
          message: apiRes.message
        };
      }
      return { success: false, message: apiRes.message || "Giriş başarısız." };
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { success: false, message: 'An unexpected error occurred.' };
    }
  },
  
  logout: async (refreshToken: string) => {
    try {
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
};
