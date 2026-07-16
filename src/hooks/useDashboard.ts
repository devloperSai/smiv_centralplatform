import { useQuery } from '@tanstack/react-query';
import { dashboardRepository } from '../repositories/DashboardRepository';

export function useOverallStats() {
  return useQuery({
    queryKey: ['dashboard', 'overall-stats'],
    queryFn: () => dashboardRepository.getOverallStats(),
  });
}

export function useVillageStats(villageId: string | undefined) {
  return useQuery({
    queryKey: ['dashboard', 'village-stats', villageId],
    queryFn: () => dashboardRepository.getVillageStats(villageId as string),
    enabled: !!villageId,
  });
}

export function useAssignmentStats(villageId: string | undefined) {
  return useQuery({
    queryKey: ['dashboard', 'assignment-stats', villageId],
    queryFn: () => dashboardRepository.getAssignmentStats(villageId as string),
    enabled: !!villageId,
  });
}
