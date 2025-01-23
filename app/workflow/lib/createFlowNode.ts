import { AppNode } from "@/app/workflow/types/appNode";
import { TaskType } from "@/app/workflow/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "ElementNode",
    data: {
      type: nodeType,
      inputs: {},
      outputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
