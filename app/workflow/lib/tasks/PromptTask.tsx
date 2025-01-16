import { Task, TaskInputType, TaskType } from "@/app/workflow/types/task";
import { WrapText, LucideProps } from "lucide-react";

export const PromptTask: Task = {
  type: TaskType.CREATE_PROMPT,
  label: "Create Prompt",
  theme: "#10B981",
  icon: (props: LucideProps) => <WrapText {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Prompt Template",
      type: TaskInputType.STRING,
      required: true,
      hideHandle: true,
    },
  ],
};
