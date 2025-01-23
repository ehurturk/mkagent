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
import { EditorComponentProps } from "@/app/workflow/types/task";
import { Label } from "@/components/ui/label";
import React from "react";

export default function EditorParam({
  id,
  param,
  value,
  onSave,
}: EditorComponentProps<string>) {
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
    <div className="space-y-2 p-2 w-full group transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label
            htmlFor={id}
            className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors"
          >
            {param.name}
          </Label>
        </div>
      </div>

      <div className="relative">
        {EditorComponent && (
          <EditorComponent
            id={id}
            param={param}
            value={parsedInitialValue}
            onSave={onSave}
          />
        )}
      </div>
    </div>
  );
}
