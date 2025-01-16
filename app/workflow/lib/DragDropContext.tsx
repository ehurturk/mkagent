import { createContext, useContext, useState } from 'react';

// Define a type for the context value
type DragDropContextType = [string | null, (type: string | null) => void];

// Create context with proper typing
const DragDropContext = createContext<DragDropContextType>([null, () => {}]);

export const DragDropProvider = ({ children }: { children: React.ReactNode }) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DragDropContext.Provider value={[type, setType]}>
            {children}
        </DragDropContext.Provider>
    );
}

export default DragDropContext;

export const useDragDrop = () => {
    return useContext(DragDropContext);
}