import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DragEvent, useState } from "react";
import { useDragDrop } from "@/app/workflow/lib/DragDropContext";
import { Badge } from "@/components/ui/badge";

const taskCategories = [
  {
    title: "Input/Output",
    icon: "🔌",
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
    tasks: [],
  },
  {
    title: "AI Tasks",
    icon: "🤖",
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
    <div className="w-80 border-r bg-background/95 backdrop-blur-xl flex flex-col h-full">
      <div className="p-4 border-b bg-background/50 backdrop-blur-xl">
        <h2 className="text-lg font-semibold mb-4">Task Library</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8 bg-background/50 focus:bg-background transition-colors"
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
              <span className="text-xl mr-2">{category.icon}</span>
              <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {category.title}
              </span>
              <Badge variant="secondary" className="ml-auto">
                {category.tasks.length}
              </Badge>
            </button>

            {expandedCategory === category.title && (
              <div className="grid gap-2 pl-7">
                {category.tasks.map((task) => (
                  <div
                    key={task.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.type)}
                    className="group relative rounded-lg border border-border/50 p-3 bg-card/50 hover:bg-card hover:border-primary/50 hover:shadow-sm transition-all duration-150 cursor-move"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-primary/10 rounded-md">
                        <span className="text-lg leading-none">
                          {task.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium leading-none mb-1.5 group-hover:text-primary transition-colors">
                          {task.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
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
