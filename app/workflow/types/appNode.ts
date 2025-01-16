import { Node } from "@xyflow/react";
import { TaskInput, TaskType } from "@/app/workflow/types/task";

export interface ParamProps {
  param: TaskInput;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: TaskType | Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}