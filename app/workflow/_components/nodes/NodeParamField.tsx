"use client";

import StringParam from "@/app/workflow/_components/nodes/params/StringParam";
import { AppNode } from "@/app/workflow/types/appNode";
import { TaskParameter, TaskParameterType } from "@/app/workflow/types/task";
import { useReactFlow } from "@xyflow/react";
import EditorParam from "@/app/workflow/_components/nodes/params/EditorParam";
import { useMutation } from "@tanstack/react-query";

function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParameter;
  nodeId: string;
  disabled: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) =>
      new Promise<void>((resolve) => {
        updateNodeData(nodeId, {
          inputs: {
            ...node?.data.inputs,
            [param.name]: data,
          },
        });
        resolve();
      }),
  });

  switch (param.type) {
    case TaskParameterType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          disabled={disabled}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParameterType.EDITOR:
      return (
        <EditorParam
          id={nodeId}
          param={param}
          value={value}
          disabled={disabled}
          onSave={updateNodeParamValue}
        />
      );
    case TaskParameterType.EXPRESSION:
      // TODO: update the value param in the execution process, store the value in the environment.
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">{param.name}</p>
        </div>
      );
    case TaskParameterType.COMPUTATION:
      // TODO: update the value param in the execution process, store the value in the environment.
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">{param.name}</p>
        </div>
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
