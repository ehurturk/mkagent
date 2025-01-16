import { LLMTask } from "@/app/workflow/lib/tasks/LLMTask";
import { PromptTask } from "@/app/workflow/lib/tasks/PromptTask";
import { Task, TaskType } from "@/app/workflow/types/task";

export const TaskRegistry: Record<TaskType, Task> = {
  CREATE_PROMPT: PromptTask,
  USE_LLM: LLMTask,
};
