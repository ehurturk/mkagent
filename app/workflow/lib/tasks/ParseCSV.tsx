import { Task, TaskParameterType, TaskType } from "@/app/workflow/types/task";
import { ExecutionState, TaskParameterStore } from "@/lib/execution/types";
import { BriefcaseConveyorBelt, LucideProps } from "lucide-react";

export const ParseCSV: Task = {
  type: TaskType.PARSE_CSV,
  label: "Parse CSV",
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
  execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
    console.log("@ PARSECSV:EXECUTE: ");
    console.log("@INPUTS:", inputs);
    console.log("@STATE:", state);
    return new Promise((resolve) => setTimeout(resolve, 3000));
  },
};
