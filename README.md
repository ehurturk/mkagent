# mkagent

## TODO:

IMPORTANT: Fix workflow creation error not shown!!!!

- Switch from Prisma to raw MySql:
  - Prevent SQL Injection attacks
  - Ensure overall security
- For `workflowActions.tsx`, cleanup error handling, use throw/return Error and then handle the error in the corresponding client.
- Task registry

- prompt editor template saving
- MIGRATE TO REACT QUERY!
- restrict edge creation to certain types.

## Task Details:

PROMPT NODES:

- **Prompt Crafter**:
  - Inputs: None
  - Attributes: Editor
  - Outputs: Prompt (Must be connected to LLM)

LLM NODES:

- **LLM**:

  - Inputs: [PromptCrafter, LLMConfig ]
  - Attributes: None
  - Outputs: Response

- **LLM CONFIG**:
  - Input: ?
  - Attributes: ?
  - Outputs: ?
- **ALU**:

  - Inputs: [IntVar, IntVar]
  - Attributes: ALUMode (+,\*,/,-,min,max, <, >, ==, <=, >=)
  - Outputs: Out

- **Router**:

  - Inputs: [A, B]
  - Attributes: Editor
  - Outputs: Out

- **Conditioner**:
  - Inputs: Expression
  - Attributes: None
  - Outputs: [True, False]

DATA NODES:

- **TransformData**:
  - Inputs: Text
  - Attributes: DataMode
  - Outputs: Data
- **CSV Reader**:

  - Inputs: CsvInput
  - Attributes: None
  - Outputs: Data

- **JSON Parser**:

  - Inputs: JsonInput
  - Attributes: None
  - Outputs: Data

- **DataFetcher**:
  - Inputs: endpoint
  - Attributes: HTTPMethod
  - Outputs: response

STATE NODES:

- **ContextStore**:

  - Inputs: [Message, Role]
  - Attributes: MaxLength (number of messages to keep)
  - Outputs: History

- **VariableStore**:
  - Inputs: [Key, Value]
  - Attributes: Mode (Store, Retrieve)
  - Outputs: Value

TOOL NODES:

- **WebSearch**:

  - Inputs: Query
  - Attributes: SearchEngine (Google/Bing/DuckDuckGo), ResultCount
  - Outputs: SearchResults

- **EmailSender**:
  - Inputs: [To, Subject, Body]
  - Attributes: SMTPConfig
  - Outputs: SendStatus

## Crucial TODO:

- WebHook support
- Graph validation & execution & environments
- 3rd party app integration (Slack/Discord/WhatsApp) (?)
- Billing system

## To run:

- start a mysql database on port 3307 (using docker)
- run `pnpm run dev`
