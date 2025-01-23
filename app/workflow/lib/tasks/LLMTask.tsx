import { Task, TaskParameterType, TaskType } from "@/app/workflow/types/task";
import { BrainIcon, LucideProps } from "lucide-react";

export const LLMTask: Task = {
  type: TaskType.USE_LLM,
  label: "Use LLM",
  theme: "#3B82F6",
  icon: (props: LucideProps) => <BrainIcon {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Prompt",
      type: TaskParameterType.CREATE_PROMPT,
      required: true,
      hideHandle: false,
      connectionCount: 1,
    },
  ],
  attributes: [],
  outputs: [
    {
      name: "Output",
      type: TaskParameterType.STRING,
    },
  ],
};
