"use client";

import StringParam from "@/app/workflow/_components/nodes/params/StringParam";
import { AppNode } from "@/app/workflow/types/appNode";
import { TaskParameter, TaskParameterType } from "@/app/workflow/types/task";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import EditorParam from "@/app/workflow/_components/nodes/params/EditorParam";
import { useMutation } from "@tanstack/react-query";

function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParameter;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useMutation({
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
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParameterType.EDITOR:
      return (
        <EditorParam
          id={nodeId}
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
