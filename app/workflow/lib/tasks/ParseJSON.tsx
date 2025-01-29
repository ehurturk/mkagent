import {Task, TaskParameterType, TaskType} from "@/app/workflow/types/task";
import {ExecutionState, TaskParameterStore} from "@/lib/execution/types";
import {BriefcaseConveyorBelt, LucideProps} from "lucide-react";

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
    execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
        console.log("@ PARSEJSON:EXECUTE: ");
        console.log("@INPUTS:", inputs);
        console.log("@STATE:", state);

        try {
            const inputStr = inputs["Input"] as string;
            const parsedData = JSON.parse(inputStr);

            return {
                "Data": parsedData // matches the output parameter name
            };
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error}`);
        }
    },
};
