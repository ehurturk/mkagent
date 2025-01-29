import {Task, TaskParameterType, TaskType} from "@/app/workflow/types/task";
import {ExecutionState, TaskParameterStore} from "@/lib/execution/types";
import {BrainIcon, LucideProps} from "lucide-react";

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
    execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
        console.log("@ LLMTASK:EXECUTE: ");
        console.log("@INPUTS:", inputs);
        console.log("@STATE:", state);

        // Simulating LLM call
        const response = "This is a simulated LLM response";

        return {
            "Output": response // matches the output parameter name
        };
    },
};
