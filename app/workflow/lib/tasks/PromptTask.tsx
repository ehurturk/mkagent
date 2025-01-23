import PromptEditor from "@/app/workflow/lib/tasks/components/PromptEditor";
import {
  Task,
  TaskParameterType,
  TaskType,
  EditorComponentProps,
} from "@/app/workflow/types/task";
import { WrapText, LucideProps } from "lucide-react";

const PromptEditorWrapped = (props: EditorComponentProps) => (
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
      args: { editor: PromptEditorWrapped },
    },
    // { name: "Variable", type: TaskParameterType.STRING, required: true },
    // { name: "Var 2", type: TaskParameterType.STRING, required: true },
  ],
  attributes: [],
  outputs: [
    {
      name: "LLM",
      type: TaskParameterType.USE_LLM,
    },
  ],
};
