/*
{
  "system": "You are a helpful assistant.",
  "human": "Write me a hey about naber",
  "variables": {
    "name": "hey",
    "topic": "naber"
  }
}
*/
import { TaskParameter } from "@/app/workflow/types/task";
import { Button } from "@/components/ui/button";
import { ChevronRight, Wand2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function EditorParam({
  id,
  param,
  value,
  updateNodeParamValue,
}: {
  id: string;
  param: TaskParameter;
  value: string;
  updateNodeParamValue: any;
}) {
  const EditorComponent = param.args?.editor;

  const parsedInitialValue = React.useMemo(() => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return {
          systemMessage: "",
          humanMessage: "",
          variables: {},
        };
      }
    }
    return (
      value || {
        systemMessage: "",
        humanMessage: "",
        variables: {},
      }
    );
  }, [value]);

  return (
    <div>
      {EditorComponent && (
        <EditorComponent
          id={id}
          param={param}
          value={parsedInitialValue}
          onSave={updateNodeParamValue}
        />
      )}
    </div>
  );
}
