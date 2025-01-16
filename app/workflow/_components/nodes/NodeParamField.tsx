"use client";

import StringParam from "@/app/workflow/_components/nodes/params/StringParam";
import { AppNode } from "@/app/workflow/types/appNode";
import { TaskInput, TaskInputType } from "@/app/workflow/types/task";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskInput;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskInputType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
}

export default NodeParamField;
