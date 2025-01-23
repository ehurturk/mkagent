"use client";

import { TaskParameter } from "@/app/workflow/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col min-w-[120px]">{children}</div>;
}

export function NodeOutput({
  output,
}: {
  output: TaskParameter;
  connectionCount?: number;
}) {
  return (
    <div className="flex items-center justify-end gap-2 p-2 relative">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        key={output.name}
        id={output.name}
        type="source"
        position={Position.Right}
        className="!bg-muted-foreground !border-2 !border-background !w-3 !h-3"
      />
    </div>
  );
}
