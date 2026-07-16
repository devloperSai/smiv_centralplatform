import { Repository } from './Repository';
import { API_ENDPOINTS } from '../config/api';

export interface LoginPayload {
  identifier?: string;
  password?: string;
  [key: string]: any;
}

export interface AuthResponse {
  message: string;
  code: number;
  data: {
    user: {
      id: string;
      role: string;
      [key: string]: any;
    };
    token: string;
  };
}

class AuthRepository extends Repository {
  /**
   * Authenticate a user
   */
  public async login(credentials: LoginPayload): Promise<AuthResponse> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }
}

export const authRepository = new AuthRepository();
