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
      name: "User Prompt",
      type: TaskParameterType.PROMPT,
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [],
};
