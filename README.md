# mkagent

## TODO:
- Switch from Prisma to raw MySql:
  - Prevent SQL Injection attacks
  - Ensure overall security
- For `workflowActions.tsx`, cleanup error handling, use throw/return Error and then handle the error in the corresponding client.
- Node outputs
- Minimap coloring
- Task registry (understanding)
## To run:
- start a mysql database on port 3307 (using docker)
- run `pnpm run dev`
