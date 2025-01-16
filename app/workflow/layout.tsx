import ModeToggle from "@/app/components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import { Brain } from "lucide-react";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">{children}</main>
      <Separator />
      <footer className="h-14 shrink-0 flex items-center justify-between px-4 relative bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center group">
          <Brain className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            mkagent
          </span>
        </div>
        <ModeToggle />
      </footer>
    </div>
  );
}

export default layout;
