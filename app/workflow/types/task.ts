import { UseMutationResult } from "@tanstack/react-query";
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

export interface EditorComponentProps<T = unknown> {
  id: string;
  param: TaskParameter;
  value: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: UseMutationResult<void, Error, any, unknown>;
  disabled?: boolean;
}

interface TaskParameterArgs {
  // TODO: Change the type!!!!!!
  editor?: React.ComponentType<
    EditorComponentProps<{
      systemMessage: string;
      humanMessage: string;
      variables: Record<string, string>;
    }>
  >;
  // TODO: add more parameters
}

export interface TaskParameter {
  name: string;
  type: TaskParameterType;
  connectionCount?: number;
  required?: boolean;
  hideHandle?: boolean;
  args?: TaskParameterArgs; // additional params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  attributes: unknown[];
  outputs: TaskParameter[];
}
