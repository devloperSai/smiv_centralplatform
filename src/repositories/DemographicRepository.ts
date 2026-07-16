import { API_ENDPOINTS } from '../config/api';
import { Repository } from './Repository';

class DemographicRepository extends Repository {
  /**
   * Get all villages
   */
  public async getVillages(): Promise<any> {
    return this.get<any>(API_ENDPOINTS.DEMOGRAPHIC.VILLAGES);
  }

  /**
   * Get village details by ID
   */
  public async getVillageDetails(villageId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.DEMOGRAPHIC.VILLAGE_DETAILS(villageId));
  }
}

export const demographicRepository = new DemographicRepository();
