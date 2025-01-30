import {Task, TaskParameterType, TaskType} from "@/app/workflow/types/task";
import {BriefcaseConveyorBelt, LucideProps} from "lucide-react";
import {ExecutionState, TaskParameterStore} from "@/lib/execution/execution";

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
        console.log("@ PARSE_CSV:EXECUTE: ");
        console.log("@INPUTS:", inputs);
        console.log("@STATE:", state);

        try {
            const inputStr = inputs["Input"] as string;

            return {
                "Data": inputStr // matches the output parameter name
            };
        } catch (error) {
            throw new Error(`Failed to parse CSV: ${error}`);
        }
    },
};
