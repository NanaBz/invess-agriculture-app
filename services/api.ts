// (Removed misplaced deleteUser method)

import axios, { AxiosInstance, AxiosError, isAxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * API Client for fertilizer-stock-app backend.
 * Handles JWT token storage, refresh, and Bearer auth headers.
 */

// Production backend URL
// For local development, use http://localhost:5000/api or http://YOUR_IP:5000/api
// For production, use https://invess-backend.onrender.com/api
// Change 'localhost' to your computer's IP (e.g., 192.168.x.x) if testing on physical device
const API_BASE_URL = __DEV__ ? 'http://localhost:5000/api' : 'https://invess-backend.onrender.com/api';

// Debug: Log the API URL being used
console.log('🔌 Using API Base URL:', API_BASE_URL, '| Dev Mode:', __DEV__);

// Storage helper for web vs native
const storage = {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface ApiError {
  message?: string;
  error?: string;
  errors?: { msg: string; field?: string }[];
}

class ApiClient {
    /**
     * DELETE /users/:id
     * Admin-only: delete a user
     */
    async deleteUser(id: string): Promise<any> {
      try {
        const response = await this.client.delete(`/users/${id}`);
        return response.data;
      } catch (err) {
        throw this.parseError(err);
      }
    }
  private client: AxiosInstance;
  private token: string | null = null;
  private static TIMEOUT_ERROR_MESSAGE = 'The request timed out. Please check your internet connection or try again later.';

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // Increased timeout to 30 seconds
    });

    // Add Bearer token to requests
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle 401 responses (token expired/invalid)
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        if (error.code === 'ECONNABORTED') {
          // Timeout error
          return Promise.reject({
            message: ApiClient.TIMEOUT_ERROR_MESSAGE,
            code: 'TIMEOUT',
          });
        }
        if (error.response?.status === 401) {
          // Token is invalid; clear it
          await this.clearToken();
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Store JWT token in SecureStore or localStorage.
   */
  private async setToken(token: string): Promise<void> {
    try {
      await storage.setItem('authToken', token);
      this.token = token;
    } catch (err) {
      console.error('Failed to store token:', err);
      throw err;
    }
  }

  /**
   * Retrieve JWT token from SecureStore/localStorage or memory.
   */
  async getToken(): Promise<string | null> {
    if (this.token) return this.token;
    try {
      const stored = await storage.getItem('authToken');
      if (stored) {
        this.token = stored;
      }
      return stored || null;
    } catch (err) {
      console.error('Failed to retrieve token:', err);
      return null;
    }
  }

  /**
   * Clear stored JWT token.
   */
  async clearToken(): Promise<void> {
    try {
      await storage.removeItem('authToken');
      this.token = null;
    } catch (err) {
      console.error('Failed to clear token:', err);
    }
  }

  /**
   * POST /auth/login
   * Returns token and user data; stores token automatically.
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('📤 [FRONTEND] Sending login request to:', API_BASE_URL + '/auth/login');
      const response = await this.client.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      console.log('✅ [FRONTEND] Login response received:', response.data);
      if (response.data.token) {
        await this.setToken(response.data.token);
      }
      return response.data;
    } catch (err) {
      console.error('❌ [FRONTEND] Login request failed:', err);
      throw this.parseError(err);
    }
  }

  /**
   * POST /auth/register
   */
  async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<{ message: string }> {
    try {
      const response = await this.client.post('/auth/register', {
        name,
        email,
        password,
        role,
      });
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * GET /requests
   * List requests (filtered by role).
   */
  async listRequests(): Promise<any[]> {
    try {
      const response = await this.client.get('/requests');
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * GET /users
   * Admin-only: list all users with their roles
   */
  async listUsers(): Promise<any[]> {
    try {
      const response = await this.client.get('/users');
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * POST /requests
   * Create a new request.
   */
  async createRequest(title: string, description: string): Promise<any> {
    try {
      const response = await this.client.post('/requests', {
        title,
        description,
      });
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * PATCH /requests/:id/approve
   */
  async approveRequest(id: string): Promise<any> {
    try {
      const response = await this.client.patch(`/requests/${id}/approve`);
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * PATCH /requests/:id/reject
   */
  async rejectRequest(id: string): Promise<any> {
    try {
      const response = await this.client.patch(`/requests/${id}/reject`);
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * GET /warehouses
   * List warehouses.
   */
  async listWarehouses(): Promise<any[]> {
    try {
      const response = await this.client.get('/warehouses');
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * POST /warehouses/stock
   * Update warehouse stock.
   */
  async updateWarehouseStock(
    warehouseId: string,
    quantity: number,
    type: 'add' | 'subtract'
  ): Promise<any> {
    try {
      const response = await this.client.post('/warehouses/stock', {
        warehouseId,
        quantity,
        type,
      });
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * GET /invoices
   * List invoices.
   */
  async listInvoices(): Promise<any[]> {
    try {
      const response = await this.client.get('/invoices');
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * POST /invoices
   * Create an invoice.
   */
  async createInvoice(
    warehouse: string,
    amount: number,
    details: string
  ): Promise<any> {
    try {
      const response = await this.client.post('/invoices', {
        warehouse,
        amount,
        details,
      });
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * PATCH /invoices/:id/paid
   * Mark invoice as paid.
   */
  async markInvoicePaid(id: string): Promise<any> {
    try {
      const response = await this.client.patch(`/invoices/${id}/paid`);
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * GET /notifications
   * List user's notifications.
   */
  async listNotifications(): Promise<any[]> {
    try {
      const response = await this.client.get('/notifications');
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * POST /notifications/send
   * Send a notification (Admin only).
   */
  async sendNotification(
    userId: string,
    title: string,
    body: string
  ): Promise<any> {
    try {
      const response = await this.client.post('/notifications/send', {
        userId,
        title,
        body,
      });
      return response.data;
    } catch (err) {
      throw this.parseError(err);
    }
  }

  /**
   * Parse error responses into user-friendly messages.
   */
  private parseError(error: unknown): Error {
    if (isAxiosError(error)) {
      const data = error.response?.data as ApiError;
      const status = error.response?.status;

      // No response (network / CORS / server down)
      if (!error.response) {
        if (error.code === 'ECONNABORTED') {
          return new Error('Request timed out. Please try again.');
        }
        return new Error('Cannot reach server. Please check your connection and retry.');
      }

      if (status === 400 && data?.errors && Array.isArray(data.errors)) {
        // Validation errors
        const msgs = data.errors.map((e) => e.msg || 'Invalid input').join('; ');
        return new Error(msgs);
      }
      if (data?.message) {
        return new Error(data.message);
      }
      if (data?.error) {
        return new Error(data.error);
      }
      if (status === 401) {
        return new Error('Unauthorized. Please log in again.');
      }
      if (status === 403) {
        return new Error('Forbidden. You do not have permission for this action.');
      }
      if (status === 404) {
        return new Error('Resource not found.');
      }
      if (status === 500) {
        return new Error('Server error. Please try again later.');
      }
      return new Error(error.message || 'An error occurred');
    }
    return error instanceof Error ? error : new Error('Unknown error');
  }
}

export const apiClient = new ApiClient();
