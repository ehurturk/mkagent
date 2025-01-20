"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteWorkflow } from "@/app/workflow/lib/actions/workflowActions";
import toast from "react-hot-toast";

interface DeleteWorkflowDialogProps {
  workflowId: string;
  workflowName: string;
  onDeleted?: () => void;
}

export function DeleteWorkflowButton({
  workflowId,
  workflowName,
  onDeleted,
}: DeleteWorkflowDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    await toast.promise(deleteWorkflow(workflowId), {
      loading: "Deleting workflow...",
      success: () => {
        onDeleted?.();
        setOpen(false);
        return "Workflow deleted successfully";
      },
      error: (error: any) =>
        `Failed to delete workflow ${workflowName}: ${error}`,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the workflow "{workflowName}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete Workflow"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
