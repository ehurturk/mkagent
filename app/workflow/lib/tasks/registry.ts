import { Conditioner } from "@/app/workflow/lib/tasks/Conditioner";
import { DataFetcher } from "@/app/workflow/lib/tasks/DataFetcherTask";
import { LLMTask } from "@/app/workflow/lib/tasks/LLMTask";
import { ParseCSV } from "@/app/workflow/lib/tasks/ParseCSV";
import { ParseJSON } from "@/app/workflow/lib/tasks/ParseJSON";
import { PromptTask } from "@/app/workflow/lib/tasks/PromptTask";
import { Task, TaskType } from "@/app/workflow/types/task";

export const TaskRegistry: Record<TaskType, Task> = {
  CREATE_PROMPT: PromptTask,
  USE_LLM: LLMTask,
  ON_CONDITION: Conditioner,
  PARSE_JSON: ParseJSON,
  PARSE_CSV: ParseCSV,
  DATA_FETCHER: DataFetcher,
};
