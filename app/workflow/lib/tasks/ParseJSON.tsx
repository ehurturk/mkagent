import { Task, TaskParameterType, TaskType } from "@/app/workflow/types/task";
import { BriefcaseConveyorBelt, LucideProps } from "lucide-react";

export const ParseJSON: Task = {
  type: TaskType.PARSE_JSON,
  label: "Parse JSON",
  theme: "#c084fc",
  icon: (props: LucideProps) => <BriefcaseConveyorBelt {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Input",
      type: TaskParameterType.STRING,
      required: true,
      hideHandle: false,
      connectionCount: 1,
    },
  ],
  attributes: [],
  outputs: [
    {
      name: "Data",
      type: TaskParameterType.DATA,
    },
  ],
};
