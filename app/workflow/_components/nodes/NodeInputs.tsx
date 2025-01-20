import NodeParamField from "@/app/workflow/_components/nodes/NodeParamField";
import { TaskParameter } from "@/app/workflow/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParameter;
  nodeId: string;
}) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle id={input.name} type="source" position={Position.Left} />
      )}
    </div>
  );
}
