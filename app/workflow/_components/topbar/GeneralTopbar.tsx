"use client";

import {Button} from "@/components/ui/button";
import {Tooltip} from "@/components/ui/tooltip";
import {TooltipProvider} from "@radix-ui/react-tooltip";
import {ChevronLeftIcon} from "lucide-react";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {usePathname} from "next/navigation";

interface Props {
    id: string;
    title: string;
    subtitle?: string;
}

function GeneralTopbar({id, title, subtitle}: Props) {
    const pathname = usePathname();

    // Get the current tab value based on the pathname
    const getCurrentTab = () => {
        if (pathname.includes("/execution")) return "execution";
        if (pathname.includes("/settings")) return "settings";
        return "edit";
    };

    return (
        <header
            className="sticky top-0 z-10 flex h-14 w-full flex-col border-b bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-background backdrop-blur-sm">
            <div className="flex h-full items-center justify-between px-4">
                <div className="flex gap-1 flex-1">
                    <TooltipProvider>
                        <Tooltip>
                            <Link href="/workflows">
                                <Button variant="ghost" size="icon">
                                    <ChevronLeftIcon size={20}/>
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
            </div>
            <div className="px-4 -mb-px">
                <Tabs value={getCurrentTab()}>
                    <TabsList>
                        <TabsTrigger value="edit" asChild>
                            <Link href={`/workflow/editor/${id}/edit`}>Workflow</Link>
                        </TabsTrigger>
                        <TabsTrigger value="execution" asChild>
                            <Link href={`/workflow/editor/${id}/execution`}>Execution</Link>
                        </TabsTrigger>
                        <TabsTrigger value="settings" asChild>
                            <Link href={`/workflow/editor/${id}/settings`}>Workflow Settings</Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </header>
    );
}

export default GeneralTopbar;