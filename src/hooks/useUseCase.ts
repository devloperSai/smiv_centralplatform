import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCaseRepository } from "../repositories/UseCaseRepository";

export function useUseCasesByCategory(
  villageId: string | undefined,
  category: string,
) {
  return useQuery({
    queryKey: ["use-cases", villageId, category],
    queryFn: () =>
      useCaseRepository.getByCategory(villageId as string, category),
    enabled: !!villageId && !!category,
  });
}

export function useUseCaseDetails(assignmentId: string | undefined) {
  return useQuery({
    queryKey: ["use-case-details", assignmentId],
    queryFn: () => useCaseRepository.getDetails(assignmentId as string),
    enabled: !!assignmentId,
  });
}

export function useUseCaseEntities(assignmentId: string | undefined) {
  return useQuery({
    queryKey: ["use-case-entities", assignmentId],
    queryFn: () => useCaseRepository.getEntities(assignmentId as string),
    enabled: !!assignmentId,
  });
}

export function useVillageCoordinates(villageId: string | undefined) {
  return useQuery({
    queryKey: ["village-coordinates", villageId],
    queryFn: () => useCaseRepository.getCoordinates(villageId as string),
    enabled: !!villageId,
  });
}

// --- Admin Queries and Mutations ---

export function useAllUseCases() {
  return useQuery({
    queryKey: ["all-use-cases"],
    queryFn: () => useCaseRepository.getAllUseCases(),
  });
}

export function useCreateUseCase() {
  return useMutation({
    mutationFn: (formData: FormData) =>
      useCaseRepository.createUseCase(formData),
  });
}

export function useUpdateUseCase() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      useCaseRepository.updateUseCase(id, data),
  });
}

export function useDeleteUseCase() {
  return useMutation({
    mutationFn: (id: string) => useCaseRepository.deleteUseCase(id),
  });
}

// --- Non-IoT Telemetry Submission ---

export function useAddTelemetry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assignmentId,
      entityId,
      data,
    }: {
      assignmentId: string;
      entityId: string;
      data: Record<string, any>;
    }) => useCaseRepository.addTelemetry(assignmentId, entityId, data),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["use-case-entities", variables.assignmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["use-case-details", variables.assignmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
