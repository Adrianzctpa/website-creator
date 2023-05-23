import { RefObject, useEffect, useState, useRef } from "react";
import { DragProps, DragState } from "../types";

const useDrag = (ref: RefObject<HTMLElement>, dependencies: DragState[] = [], options: DragProps) => {
    const { onDrag, onLeave } = options;

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragRef = useRef<boolean>();
    dragRef.current = isDragging;
    
    const handleDragLeave = (e: MouseEvent) => {
        if (!dragRef.current) {
            return;
        }

        setIsDragging(false);
        
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("click", handleDragLeave);

        onLeave(e);
    }

    const handleDrag = (e: MouseEvent) => {
        e.stopPropagation();
        setIsDragging(true);

        document.addEventListener("mousemove", onDrag);
        document.addEventListener("click", handleDragLeave);
    }

    useEffect(() => {
        const current = ref.current;

        if (current) {
            current.addEventListener("click", handleDrag);

            return () => {
                current.removeEventListener("click", handleDrag);
            }
        }

        return () => { };
    }, [...dependencies, isDragging]);

    return { isDragging };
};

export default useDrag;