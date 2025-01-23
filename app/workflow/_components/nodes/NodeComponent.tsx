import NodeCard from "@/app/workflow/_components/nodes/NodeCard";
import NodeHeader from "@/app/workflow/_components/nodes/NodeHeader";
import {
  NodeInputs,
  NodeInput,
} from "@/app/workflow/_components/nodes/NodeInputs";
import {
  NodeOutput,
  NodeOutputs,
} from "@/app/workflow/_components/nodes/NodeOutputs";
import { TaskRegistry } from "@/app/workflow/lib/tasks/registry";
import { AppNodeData } from "@/app/workflow/types/appNode";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <div className="flex justify-between">
        {" "}
        {/* Container for inputs and outputs */}
        <NodeInputs>
          {task.inputs.map((input) => (
            <NodeInput
              key={input.name}
              input={input}
              nodeId={props.id}
              connectionCount={input.connectionCount}
            />
          ))}
        </NodeInputs>
        <NodeOutputs>
          {task.outputs.map((out) => (
            <NodeOutput
              key={out.name}
              output={out}
              connectionCount={out.connectionCount}
            />
          ))}
        </NodeOutputs>
      </div>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
