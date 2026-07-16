import { Repository } from './Repository';
import { API_ENDPOINTS } from '../config/api';

// Example Interface for a User
export interface User {
  id: number;
  name: string;
  email: string;
}

class ExampleRepository extends Repository {
  
  /**
   * Fetch all users
   */
  public async getUsers(): Promise<User[]> {
    return this.get<User[]>(API_ENDPOINTS.USERS.LIST);
  }

  /**
   * Fetch a single user by ID
   */
  public async getUserById(id: number): Promise<User> {
    return this.get<User>(API_ENDPOINTS.USERS.DETAILS(id));
  }

  /**
   * Create a new user
   */
  public async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return this.post<User>(API_ENDPOINTS.USERS.CREATE, userData);
  }

  /**
   * Update an existing user
   */
  public async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.put<User>(API_ENDPOINTS.USERS.UPDATE(id), userData);
  }

  /**
   * Delete a user
   */
  public async deleteUser(id: number): Promise<void> {
    return this.delete<void>(API_ENDPOINTS.USERS.DELETE(id));
  }
}

// Export a singleton instance of the repository
export const userRepository = new ExampleRepository();
