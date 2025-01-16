import { LucideProps } from "lucide-react";

export enum TaskInputType {
  STRING = "STRING",
  PROMPT = "PROMPT",
}

export interface TaskInput {
  name: string;
  type: TaskInputType;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
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
  inputs: TaskInput[];
}
