// import { create } from "zustand";
// import { Task } from "@/app/workflow/types/task";
// import ExecutionEnvironment, { ExecutionState } from "@/lib/execution/types";
//
// interface ExecutionStore {
//   env: ExecutionEnvironment;
//   state: ExecutionState;
//   registerTask: (taskId: string, task: Task) => void;
//   addToQueue: (taskId: string) => void;
//   setDependencies: (taskId: string, dependencies: string[]) => void;
//   execute: () => Promise<void>;
// }
//
// export const useExecutionStore = create<ExecutionStore>((set, get) => ({
//   env: new ExecutionEnvironment(),
//   state: { variables: {}, taskOutputs: {} },
//
//   registerTask: (taskId, task) => {
//     const { env } = get();
//     env.registerTask(taskId, task);
//   },
//
//   addToQueue: (taskId) => {
//     const { env } = get();
//     env.addToQueue(taskId);
//   },
//
//   setDependencies: (taskId, dependencies) => {
//     const { env } = get();
//     env.setDependencies(taskId, dependencies);
//   },
//
//   execute: async () => {
//     const { env } = get();
//     await env.execute();
//   },
// }));
