import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token em todas as requisições
    this.client.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para tratar erros
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Auth endpoints
  async login(username: string): Promise<{ token: string; type: string }> {
    const response = await this.client.post('/auth/login', { username });
    return response.data;
  }

  // Order endpoints
  async createOrder(data: {
    branchId: string;
    itemId: string;
    quantity: number;
  }): Promise<any> {
    const response = await this.client.post('/orders', data);
    return response.data;
  }

  async getOrderById(orderId: string): Promise<any> {
    const response = await this.client.get(`/orders/${orderId}`);
    return response.data;
  }

  async getOrders(branchId?: string): Promise<any[]> {
    const params = branchId ? { branchId } : {};
    const response = await this.client.get('/orders', { params });
    return response.data;
  }
}

export const apiService = new ApiService();

