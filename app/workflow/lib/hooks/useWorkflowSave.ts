import { updateWorkflow } from "@/app/workflow/lib/actions/workflowActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useWorkflowSave(id: string) {
  const queryClient = useQueryClient();
  const saveWorkflowMutation = useMutation({
    mutationFn: async (definition: any) => {
      return updateWorkflow(id, {
        definition: JSON.stringify(definition),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const saveWorkflow = async (definition: any) => {
    return toast.promise(saveWorkflowMutation.mutateAsync(definition), {
      loading: "Saving...",
      success: "Saved!",
      error: (e: Error) => "Error happened while saving. Please try again.",
    });
  };

  return { saveWorkflow, isSaving: saveWorkflowMutation.isPending };
}
