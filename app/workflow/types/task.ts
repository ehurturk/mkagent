import { LucideProps } from "lucide-react";

export enum TaskParameterType {
  STRING = "STRING",
  CREATE_PROMPT = "CREATE_PROMPT",
  EDITOR = "EDITOR", // for prompt editor, etc.
  USE_LLM = "USE_LLM",
  EXPRESSION = "EXPRESSION", // boolean expressions
  COMPUTATION = "COMPUTATION", // represents a future computation
  DATA = "DATA",
  DROPDOWN = "DROPDOWN",
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
  connectionCount?: number;
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
  ON_CONDITION = "ON_CONDITION",
  PARSE_JSON = "PARSE_JSON",
}

export interface Task {
  type: TaskType;
  label: string;
  theme: string;
  icon: (props: LucideProps) => React.ReactNode;
  isEntryPoint: boolean;
  inputs: TaskParameter[];
  attributes: any[];
  outputs: TaskParameter[];
}
