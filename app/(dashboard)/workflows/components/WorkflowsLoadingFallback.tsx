import {Loader} from "lucide-react";

export default function WorkflowsLoadingFallback() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader className="h-8 w-8 animate-spin text-primary"/>
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium">Loading Workflow Editor</h3>
                    <p className="text-sm text-muted-foreground">Preparing your workspace...</p>
                </div>
            </div>

            {/* Optional loading grid background effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-white/10"/>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"/>
            </div>
        </div>
    );
}