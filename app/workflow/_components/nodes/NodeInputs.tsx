import NodeParamField from "@/app/workflow/_components/nodes/NodeParamField";
import { TaskParameter } from "@/app/workflow/types/task";
import { Edge, Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-w-[120px]">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParameter;
  nodeId: string;
  connectionCount?: number;
}) {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge: Edge) => edge.targetHandle == input.name && edge.target == nodeId
  );
  return (
    <div className="flex items-center gap-2 p-2 relative">
      {!input.hideHandle && (
        <Handle id={input.name} type="target" position={Position.Left} />
      )}
      <div className="flex-1">
        <NodeParamField disabled={isConnected} param={input} nodeId={nodeId} />
      </div>
    </div>
  );
}
