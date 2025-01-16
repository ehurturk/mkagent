// components/CreateWorkflowButton.tsx
"use client";

import { CreateWorkflowDialog } from "@/app/(dashboard)/workflows/components/CreateWorkflowDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function CreateWorkflowButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/90 border border-primary/20 hover:border-primary/30 transition-all duration-300"
      >
        <PlusCircle size={20} className="animate-pulse" />
        Create Workflow
      </Button>
      <CreateWorkflowDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function CreateWorkflowCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-border hover:border-primary/50 group"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-br-lg" />

        <div className="relative flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground group-hover:text-primary/80 transition-colors">
          <div className="relative">
            <PlusCircle
              size={40}
              className="mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90"
            />
          </div>
          <div className="text-lg font-medium mb-2">Create New Workflow</div>
          <div className="text-sm text-center max-w-[200px]">
            Build your next automation workflow visually
          </div>
        </div>
      </div>
      <CreateWorkflowDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
