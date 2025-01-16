export interface IWorkflow {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    definition: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
}