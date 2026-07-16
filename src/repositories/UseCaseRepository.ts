import { Repository } from './Repository';
import { API_ENDPOINTS } from '../config/api';

export class UseCaseRepository extends Repository {
  /**
   * Get use cases by village ID and category (e.g. 'IoT' or 'non IoT')
   */
  public async getByCategory(villageId: string, category: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.USE_CASE.BY_CATEGORY(villageId, category));
  }

  /**
   * Get use case details by assignment ID
   */
  public async getDetails(assignmentId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.USE_CASE.DETAILS(assignmentId));
  }

  /**
   * Get entities for an assignment
   */
  public async getEntities(assignmentId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.USE_CASE.ENTITIES(assignmentId));
  }

  /**
   * Get all coordinates for a village
   */
  public async getCoordinates(villageId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.USE_CASE.COORDINATES(villageId));
  }

  // --- Admin CRUD Operations ---

  public async getAllUseCases(): Promise<any> {
    return this.get<any>(API_ENDPOINTS.USE_CASE_ADMIN.BASE);
  }

  public async createUseCase(formData: FormData): Promise<any> {
    return this.post<any>(API_ENDPOINTS.USE_CASE_ADMIN.BASE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  public async updateUseCase(id: string, data: any): Promise<any> {
    return this.put<any>(API_ENDPOINTS.USE_CASE_ADMIN.DETAILS(id), data);
  }

  public async deleteUseCase(id: string): Promise<any> {
    return this.delete<any>(API_ENDPOINTS.USE_CASE_ADMIN.DETAILS(id));
  }
}

export const useCaseRepository = new UseCaseRepository();
