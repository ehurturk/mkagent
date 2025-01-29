// import { useExecutionStore } from "@/app/workflow/lib/store/useExecutionStore";
// import { useMutation } from "@tanstack/react-query";
//
// export function useExecution() {
//   const env = useExecutionStore((state) => state.env);
//
//   return useMutation({
//     mutationFn: async () => {
//       return await env.execute();
//     },
//   });
// }
//
// /*
// // Usage:
// const { registerTask, addToQueue } = useExecutionStore();
// const { mutate: execute, isLoading } = useExecution();
//
// // Register tasks first
// registerTask("fetch-task-1", "DATA_FETCHER", {...});
// addToQueue("fetch-task-1");
//
// // Later execute
// execute();
// */
