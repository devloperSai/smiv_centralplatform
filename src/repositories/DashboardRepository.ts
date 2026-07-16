import { Repository } from './Repository';
import { API_ENDPOINTS } from '../config/api';

export class DashboardRepository extends Repository {
  /**
   * Get overall stats across all villages
   */
  public async getOverallStats(): Promise<any> {
    return this.get<any>(API_ENDPOINTS.DASHBOARD.OVERALL_STATS);
  }

  /**
   * Get stats for a specific village
   */
  public async getVillageStats(villageId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.DASHBOARD.VILLAGE_STATS(villageId));
  }

  /**
   * Get assignment stats for a specific village
   */
  public async getAssignmentStats(villageId: string): Promise<any> {
    return this.get<any>(API_ENDPOINTS.DASHBOARD.ASSIGNMENT_STATS(villageId));
  }
}

export const dashboardRepository = new DashboardRepository();
