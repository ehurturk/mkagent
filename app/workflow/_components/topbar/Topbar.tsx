"use client";

import SaveBtn from "@/app/workflow/_components/topbar/SaveBtn";
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
    <header className="flex p-2 border-p2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
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
        <SaveBtn id={id} />
      </div>
    </header>
  );
}

export default Topbar;
