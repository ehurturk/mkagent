import {Task, TaskParameterType, TaskType} from "@/app/workflow/types/task";
import {ShieldQuestion, LucideProps} from "lucide-react";
import {ExecutionState, TaskParameterStore} from "@/lib/execution/execution";

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
    execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
        console.log("@ LLMTASK:EXECUTE: ");
        console.log("@INPUTS:", inputs);
        console.log("@STATE:", state);

        // Simulating LLM call
        const t = `{"a":1}`;
        const f = `{"b":2}`;
        const selectedBranch = "True"

        return {
            "True": t, // matches the output parameter name
            "False": f, // matches the output parameter name,
            "selectedBranch": selectedBranch
        };
    },
};
