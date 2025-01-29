import { Task, TaskParameterType, TaskType } from "@/app/workflow/types/task";
import { ExecutionState, TaskParameterStore } from "@/lib/execution/types";
import { BriefcaseConveyorBelt, LucideProps } from "lucide-react";

export const DataFetcher: Task = {
  type: TaskType.DATA_FETCHER,
  label: "Fetch Data",
  theme: "#c084fc",
  icon: (props: LucideProps) => <BriefcaseConveyorBelt {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Endpoint",
      type: TaskParameterType.STRING,
      required: true,
      hideHandle: false,
      connectionCount: 1,
    },
  ],
  attributes: [],
  outputs: [
    {
      name: "Response",
      type: TaskParameterType.JSON_DATA,
    },
  ],
  execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
    console.log("@ DATAFETCHER:EXECUTE: ");
    console.log("@INPUTS:", inputs);
    console.log("@STATE:", state);
    return new Promise((resolve) => setTimeout(resolve, 3000));
  },
};
