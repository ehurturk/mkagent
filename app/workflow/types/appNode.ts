import { Node } from "@xyflow/react";
import { TaskParameter, TaskType } from "@/app/workflow/types/task";

export interface ParamProps<T = string> {
  param: TaskParameter;
  value: T;
  updateNodeParamValue: any;
  disabled: boolean;
}

export interface AppNodeData {
  type: TaskType;
  // "Prompt Template": ""
  inputs: Record<string, string>;
  outputs: Record<string, string>;
  [key: string]: TaskType | Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
