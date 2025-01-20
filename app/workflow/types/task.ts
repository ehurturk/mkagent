import { LucideProps } from "lucide-react";

export enum TaskParameterType {
  STRING = "STRING",
  PROMPT = "PROMPT",
  EDITOR = "EDITOR", // for prompt editor, etc.
  LLM = "LLM",
}

export interface EditorComponentProps<T = any> {
  id: string;
  param: TaskParameter;
  value: T;
  onSave: any;
}

interface TaskParameterArgs {
  editor?: React.ComponentType<EditorComponentProps>;
  // TODO: add more parameters
}

export interface TaskParameter {
  name: string;
  type: TaskParameterType;
  required?: boolean;
  hideHandle?: boolean;
  args?: TaskParameterArgs; // additional params
  [key: string]: any;
}

export interface TaskOutput {
  name: string;
  type: Task;
}

export enum TaskType {
  CREATE_PROMPT = "CREATE_PROMPT",
  USE_LLM = "USE_LLM",
}

export interface Task {
  type: TaskType;
  label: string;
  theme: string;
  icon: (props: LucideProps) => React.ReactNode;
  isEntryPoint: boolean;
  inputs: TaskParameter[];
  outputs: TaskParameter[];
}
