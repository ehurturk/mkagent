import { TaskRegistry } from "@/app/workflow/lib/tasks/registry";
import { TaskType } from "@/app/workflow/types/task";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import React from "react";

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  return (
    <div
      className="flex items-center gap-2 p-2"
      style={{
        display: "flex",
        background: task.theme,
        color: "#fff",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        boxShadow: "inset 0 -1px rgba(0,0,0,0.4)",
        textShadow: "0 1px rgba(0,0,0,0.4)",
      }}
    >
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-white text-xs font-bold uppercase">{task.label}</p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && (
            // <Badge variant={"outline"}>
            <Play size={16} />
            // </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
