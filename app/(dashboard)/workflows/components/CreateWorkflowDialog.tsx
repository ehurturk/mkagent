"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createWorkflow } from "@/app/workflow/lib/actions/workflowActions";

interface CreateWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  description: string;
  type: string;
  visibility: string;
}

export function CreateWorkflowDialog({
  open,
  onOpenChange,
}: CreateWorkflowDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    type: "agent",
    visibility: "private",
  });


  const handleCreate = async () => {
    setIsLoading(true);
    setError(null);

    if (!formData.name.trim()) {
      setError("Workflow name is required");
      setIsLoading(false);
      return;
    }
    try {
      const resp = await createWorkflow({
        userId: "ZAZAZA",
        name: formData.name,
        description: formData.description,
        status: "draft",
      });
      if (!resp) {
        setError("A technical error occured. Please try again.");
        return;
      }
      if (resp.error) {
        // Handle error (maybe show an error message)
        setError(resp.error);
        return;
      }
      if (resp.data) {
        router.push(`/workflow/editor/${resp.data.id}`);
        onOpenChange(false);
      }
    } catch (e) {
      setError(`Failed to create workflow: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null); // Clear error when user makes changes
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-blue-400" />
            Create New Workflow
          </DialogTitle>
          <DialogDescription>
            Create a new workflow to automate your tasks. Fill in the details
            below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Workflow"
              className="w-full"
              onBlur={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this workflow does..."
              className="w-full"
              onBlur={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              defaultValue="agent"
              onValueChange={(e) => setFormData({ ...formData, type: e })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select workflow type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">AI Agent</SelectItem>
                <SelectItem value="chain">Chain</SelectItem>
                <SelectItem value="tool">Custom Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              defaultValue="private"
              onValueChange={(e) => setFormData({ ...formData, visibility: e })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="team">Team Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? "Creating..." : "Create Workflow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
