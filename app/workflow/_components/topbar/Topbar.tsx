"use client";

import SaveBtn from "@/app/workflow/_components/topbar/SaveBtn";
import ExecuteButton from "@/app/workflow/_components/topbar/RunBtn";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
}

function Topbar({ id, title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-background backdrop-blur-sm px-4">
      <div className="flex gap-1 flex-1">
        <TooltipProvider>
          <Tooltip>
            <Link href="/workflows">
              <Button variant={"ghost"} size={"icon"}>
                <ChevronLeftIcon size={20} />
              </Button>
            </Link>
          </Tooltip>
        </TooltipProvider>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <ExecuteButton />
        <SaveBtn id={id} />
      </div>
    </header>
  );
}

export default Topbar;
