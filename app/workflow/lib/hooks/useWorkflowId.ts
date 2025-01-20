// hooks/useWorkflowId.ts
import { useQueryClient, useQuery } from "@tanstack/react-query";

export const WORKFLOW_ID_KEY = ["currentWorkflowId"] as const;

export function useWorkflowId() {
  const queryClient = useQueryClient();

  const { data: workflowId } = useQuery({
    queryKey: WORKFLOW_ID_KEY,
    queryFn: () => {
      const currentId = queryClient.getQueryData<string>(WORKFLOW_ID_KEY);
      return currentId ?? null;
    },
    staleTime: Infinity,
    initialData: null,
  });

  const setWorkflowId = (id: string) => {
    queryClient.setQueryData(WORKFLOW_ID_KEY, id);
  };

  return { workflowId, setWorkflowId };
}
