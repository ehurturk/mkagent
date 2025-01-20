import { useReactFlow } from "@xyflow/react";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkflowSave } from "@/app/workflow/lib/hooks/useWorkflowSave";

export default function SaveBtn({ id }: { id: string }) {
  const { toObject } = useReactFlow();

  const { saveWorkflow } = useWorkflowSave(id);

  const handleSave = async () => {
    await saveWorkflow(toObject());
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleSave}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <span className="animate-spin">↻</span>
        ) : status === "success" ? (
          <CheckIcon size={16} className="stroke-green-500" />
        ) : status === "error" ? (
          <XIcon size={16} className="stroke-red-500" />
        ) : (
          <CheckIcon size={16} className="stroke-green-400" />
        )}
        {status === "loading" ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
