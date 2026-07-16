import { useQuery } from '@tanstack/react-query';
import { demographicRepository } from '../repositories/DemographicRepository';

export function useVillages() {
  return useQuery({
    queryKey: ['demographic-villages'],
    queryFn: () => demographicRepository.getVillages(),
  });
}

export function useVillageDetails(villageId: string | undefined) {
  return useQuery({
    queryKey: ['demographic-village-details', villageId],
    queryFn: () => demographicRepository.getVillageDetails(villageId as string),
    enabled: !!villageId,
  });
}
