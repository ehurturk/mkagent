import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Progress} from "@/components/ui/progress";
import {NodeExecutionStatus} from '@/lib/execution/execution';
import {Loader2, CheckCircle2, XCircle, SkipForward, AlertCircle} from 'lucide-react';
import {TaskRegistry} from "@/app/workflow/lib/tasks/registry";
import {AppNode} from '@/app/workflow/types/appNode';

interface ExecutionProgressProps {
    isOpen: boolean;
    onClose: () => void;
    nodes: AppNode[];
    executionState: Map<string, { status: NodeExecutionStatus; error?: Error }>;
}

const statusIcons = {
    [NodeExecutionStatus.PENDING]: AlertCircle,
    [NodeExecutionStatus.RUNNING]: Loader2,
    [NodeExecutionStatus.COMPLETED]: CheckCircle2,
    [NodeExecutionStatus.SKIPPED]: SkipForward,
    [NodeExecutionStatus.ERROR]: XCircle,
};

const statusColors = {
    [NodeExecutionStatus.PENDING]: "text-gray-400",
    [NodeExecutionStatus.RUNNING]: "text-blue-500",
    [NodeExecutionStatus.COMPLETED]: "text-green-500",
    [NodeExecutionStatus.SKIPPED]: "text-yellow-500",
    [NodeExecutionStatus.ERROR]: "text-red-500",
};

export default function ExecutionProgress({nodes, executionState, onClose, isOpen}: ExecutionProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalNodes = nodes.length;
        const completedNodes = Array.from(executionState.values()).filter(
            state => state.status === NodeExecutionStatus.COMPLETED ||
                state.status === NodeExecutionStatus.SKIPPED
        ).length;

        setProgress((completedNodes / totalNodes) * 100);
    }, [executionState, nodes]);

    const nodesByStatus = Array.from(executionState.entries()).reduce(
        (acc, [nodeId, state]) => {
            if (!acc[state.status]) {
                acc[state.status] = [];
            }
            acc[state.status].push(nodeId);
            return acc;
        },
        {} as Record<NodeExecutionStatus, string[]>
    );

    const StatusBadge: React.FC<{ status: NodeExecutionStatus }> = ({status}) => {
        const Icon = statusIcons[status];
        return (
            <div className={`flex items-center ${statusColors[status]}`}>
                <Icon className="h-4 w-4 mr-2"/>
                <span>{status}</span>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Workflow Execution Progress</DialogTitle>
                </DialogHeader>

                {/* Overall Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress}/>
                </div>

                {/* Node Status List */}
                <div className="mt-4 space-y-4">
                    {nodes.map(node => {
                        const state = executionState.get(node.id);
                        const status = state?.status || NodeExecutionStatus.PENDING;
                        const task = TaskRegistry[node.data.type];
                        const Icon = statusIcons[status];

                        return (
                            <div
                                key={node.id}
                                className="flex items-center justify-between p-3 rounded-lg border"
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className={`h-5 w-5 ${statusColors[status]} ${
                                        status === NodeExecutionStatus.RUNNING ? 'animate-spin' : ''
                                    }`}/>
                                    <div>
                                        <div className="font-medium">{task.label}</div>
                                        <div className="text-sm text-gray-500">ID: {node.id}</div>
                                    </div>
                                </div>
                                <StatusBadge status={status}/>
                                {state?.error && (
                                    <div className="text-sm text-red-500 mt-1">
                                        {state.error.message}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Status Summary */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {Object.entries(NodeExecutionStatus).map(([key, status]) => {
                        const count = nodesByStatus[status]?.length || 0;
                        return (
                            <div
                                key={key}
                                className="flex items-center justify-between p-2 rounded-lg border"
                            >
                                <StatusBadge status={status}/>
                                <span className="font-medium">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};