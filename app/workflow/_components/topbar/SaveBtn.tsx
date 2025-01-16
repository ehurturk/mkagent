import { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {updateWorkflow} from "@/app/workflow/lib/actions/workflowActions";
import toast from "react-hot-toast";

export default function SaveBtn({ id }: { id: string }) {
  const { toObject } = useReactFlow();

  const handleSave = async () => {
    try {
      const response = await updateWorkflow(id, { definition: JSON.stringify(toObject()) });

      if (!response.success) {
        throw new Error(response.error || 'Failed to save workflow');
      }

      toast.success("Workflow saved successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
      <div className="space-y-2">
        <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSave}
            disabled={status === 'loading'}
        >
          {status === 'loading' ? (
              <span className="animate-spin">↻</span>
          ) : status === 'success' ? (
              <CheckIcon size={16} className="stroke-green-500" />
          ) : status === 'error' ? (
              <XIcon size={16} className="stroke-red-500" />
          ) : (
              <CheckIcon size={16} className="stroke-green-400" />
          )}
          {status === 'loading' ? 'Saving...' : 'Save'}
        </Button>
      </div>
  );
}