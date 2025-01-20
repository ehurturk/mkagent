import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DragEvent, useState } from "react";
import { useDragDrop } from "@/app/workflow/lib/DragDropContext";
import { Badge } from "@/components/ui/badge";

const taskCategories = [
  {
    title: "Input/Output",
    icon: "🔌",
    color: "from-blue-500/20 to-cyan-500/20",
    tasks: [
      {
        type: "CREATE_PROMPT",
        title: "Create Prompt",
        description: "Create an AI prompt template",
        icon: "✍️",
      },
    ],
  },
  {
    title: "Processing",
    icon: "⚡",
    color: "from-amber-500/20 to-yellow-500/20",
    tasks: [],
  },
  {
    title: "AI Tasks",
    icon: "🤖",
    color: "from-violet-500/20 to-purple-500/20",
    tasks: [
      {
        type: "USE_LLM",
        title: "Use LLM",
        description: "Use an LLM (requires a Prompt)",
        icon: "💭",
      },
    ],
  },
];

function TaskMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("Input/Output");
  const [_, setType] = useDragDrop();

  const onDragStart = (event: DragEvent<HTMLDivElement>, taskType: string) => {
    if (setType) setType(taskType);
    event.dataTransfer.effectAllowed = "move";
  };

  const filteredCategories = taskCategories
    .map((category) => ({
      ...category,
      tasks: category.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.tasks.length > 0);

  return (
    <div className="w-80 border-r flex flex-col h-full bg-gradient-to-b from-blue-400/10 via-purple-400/5 to-background">
      <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Task Library</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-auto flex-1 p-4 space-y-6">
        {filteredCategories.map((category) => (
          <div key={category.title} className="space-y-2">
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.title ? "" : category.title
                )
              }
              className="flex items-center w-full text-sm group"
            >
              <ChevronRight
                className={`h-4 w-4 mr-1 transition-transform ${
                  expandedCategory === category.title ? "rotate-90" : ""
                }`}
              />
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.title}</span>
                <Badge variant="secondary" className="ml-auto">
                  {category.tasks.length}
                </Badge>
              </div>
            </button>

            {expandedCategory === category.title && (
              <div className="grid gap-3 pl-7">
                {category.tasks.map((task) => (
                  <div
                    key={task.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.type)}
                    className="group relative rounded-lg border p-3 cursor-move transition-all duration-150
                    bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 hover:from-blue-400/10 hover:via-purple-400/10 hover:to-blue-400/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-gradient-to-br from-blue-400/10 to-purple-400/10">
                        <span className="text-lg leading-none">
                          {task.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium leading-none mb-2">
                          {task.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskMenu;
