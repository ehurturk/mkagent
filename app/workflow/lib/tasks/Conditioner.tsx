import { Task, TaskParameterType, TaskType } from "@/app/workflow/types/task";
import { ShieldQuestion, LucideProps } from "lucide-react";

export const Conditioner: Task = {
  type: TaskType.ON_CONDITION,
  label: "Conditioner",
  theme: "#fbba76",
  icon: (props: LucideProps) => <ShieldQuestion {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Expression",
      type: TaskParameterType.EXPRESSION,
      required: true,
      hideHandle: false,
      connectionCount: 1,
    },
    {
      name: "True",
      type: TaskParameterType.COMPUTATION,
      hideHandle: false,
      connectionCount: 1,
    },
    {
      name: "False",
      type: TaskParameterType.COMPUTATION,
      hideHandle: false,
      connectionCount: 1,
    },
  ],
  attributes: [],
  outputs: [
    {
      name: "True",
      type: TaskParameterType.COMPUTATION,
    },
    {
      name: "False",
      type: TaskParameterType.COMPUTATION,
    },
  ],
};
