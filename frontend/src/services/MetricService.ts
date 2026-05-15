import { api } from './api';

export interface MetricRequest {
  type: number;
  value: number;
  date: string;
}

export interface MetricResponse {
  id: string;
  type: number;
  value: number;
  date: string;
}

export const MetricService = {
  addMetric: async (metric: MetricRequest) => {
    const response = await api.post('/metrics', metric);
    return response.data;
  },

  getMetrics: async (type?: number): Promise<MetricResponse[]> => {
    const response = await api.get('/metrics', { params: { type } });
    return response.data.data || [];
  },

  deleteMetric: async (id: string) => {
    const response = await api.delete(`/metrics/${id}`);
    return response.data;
  }
};
