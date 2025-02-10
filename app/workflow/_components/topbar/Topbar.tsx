"use client";

import SaveBtn from "@/app/workflow/_components/topbar/SaveBtn";
import ExecuteButton from "@/app/workflow/_components/topbar/RunBtn";
import {Button} from "@/components/ui/button";
import {Tooltip} from "@/components/ui/tooltip";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {ChevronLeftIcon, Settings2, Play, FileEdit} from "lucide-react";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {usePathname} from "next/navigation";
import {useWorkflow} from "@/app/workflow/_components/WorkflowContext";
import {cn} from "@/lib/utils";

function Topbar() {
    const pathname = usePathname();
    const workflow = useWorkflow();

    const getCurrentTab = () => {
        if (pathname.includes("/execution")) return "execution";
        if (pathname.includes("/settings")) return "settings";
        return "edit";
    };

    return (
        <header className="sticky top-0 z-10 flex h-14 border-b bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-background backdrop-blur-sm">
            <div className="flex h-full w-full items-center justify-between px-4">
                <div className="flex gap-2 items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <Link href="/workflows">
                                <Button variant="ghost" size="icon" className="hover:bg-background/60">
                                    <ChevronLeftIcon size={20}/>
                                </Button>
                            </Link>
                        </Tooltip>
                    </TooltipProvider>
                    <div>
                        <p className="font-semibold text-ellipsis truncate leading-tight">{workflow.name}</p>
                        {workflow.description && (
                            <p className="text-xs text-muted-foreground truncate text-ellipsis">
                                {workflow.description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Tabs value={getCurrentTab()} className="w-fit">
                        <TabsList className="bg-background/50 h-9">
                            <TabsTrigger
                                value="edit"
                                asChild
                                className="data-[state=active]:bg-background data-[state=active]:shadow-none">
                                <Link
                                    href={`/workflow/editor/${workflow.id}/edit`}
                                    className={cn(
                                        "flex items-center gap-2",
                                        getCurrentTab() === "edit" ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                    <FileEdit size={16} />
                                    Workflow
                                </Link>
                            </TabsTrigger>
                            <TabsTrigger
                                value="execution"
                                asChild
                                className="data-[state=active]:bg-background data-[state=active]:shadow-none">
                                <Link
                                    href={`/workflow/editor/${workflow.id}/execution`}
                                    className={cn(
                                        "flex items-center gap-2",
                                        getCurrentTab() === "execution" ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                    <Play size={16} />
                                    Execution
                                </Link>
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                asChild
                                className="data-[state=active]:bg-background data-[state=active]:shadow-none">
                                <Link
                                    href={`/workflow/editor/${workflow.id}/settings`}
                                    className={cn(
                                        "flex items-center gap-2",
                                        getCurrentTab() === "settings" ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                    <Settings2 size={16} />
                                    Settings
                                </Link>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex gap-2 pl-2 border-l">
                        <ExecuteButton/>
                        <SaveBtn/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;