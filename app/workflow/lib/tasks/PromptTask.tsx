import PromptEditor from "@/app/workflow/lib/tasks/components/PromptEditor";
import {
    Task,
    TaskParameterType,
    TaskType,
    EditorComponentProps,
} from "@/app/workflow/types/task";
import {ExecutionState, TaskParameterStore} from "@/lib/execution/types";
import {WrapText, LucideProps} from "lucide-react";

const PromptEditorWrapped = (
    props: EditorComponentProps<{
        systemMessage: string;
        humanMessage: string;
        variables: Record<string, string>;
    }>
) => (
    <PromptEditor
        id={props.id}
        param={props.param}
        value={props.value}
        onSave={props.onSave}
    />
);

export const PromptTask: Task = {
    type: TaskType.CREATE_PROMPT,
    label: "Create Prompt",
    theme: "#10B981",
    icon: (props: LucideProps) => <WrapText {...props} />,
    isEntryPoint: true,
    inputs: [
        {
            name: "Prompt Template",
            type: TaskParameterType.EDITOR,
            required: true,
            hideHandle: true,
            args: {editor: PromptEditorWrapped},
        },
        // { name: "Variable", type: TaskParameterType.STRING, required: true },
        // { name: "Var 2", type: TaskParameterType.STRING, required: true },
    ],
    attributes: [],
    outputs: [
        {
            name: "Prompt",
            type: TaskParameterType.USE_LLM,
        },
    ],
    execute: async (inputs: TaskParameterStore, state: ExecutionState) => {
        console.log("@ LLMTASK:EXECUTE: ");
        console.log("@INPUTS:", inputs);
        console.log("@STATE:", state);

        // Simulating LLM call
        const prompt = "This is a prompt";

        return {
            "Prompt": prompt // matches the output parameter name
        };
    },
};
