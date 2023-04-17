import { RefObject, useEffect, useState } from "react";
import { DragProps, DragState } from "../types";

const useDrag = (ref: RefObject<HTMLElement>, dependencies: DragState[] = [], options: DragProps) => {
    const { onPointDown, onPointMove, onDrag, onPointUp } = options;

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handlePointDown = (e: PointerEvent) => {
        setIsDragging(true);
        onPointDown(e);
    }

    const handlePointUp = (e: PointerEvent) => {
        setIsDragging(false);
        onPointUp(e);
    }

    const handlePointMove = (e: PointerEvent) => {
        onPointMove(e);

        if (isDragging) {
            onDrag(e);
        }
    }

    useEffect(() => {
        const current = ref.current;

        if (current) {
            document.addEventListener("pointerdown", handlePointDown);
            document.addEventListener("pointerup", handlePointUp);
            document.addEventListener("pointermove", handlePointMove);

            return () => {
                document.removeEventListener("pointerdown", handlePointDown);
                document.removeEventListener("pointerup", handlePointUp);
                document.removeEventListener("pointermove", handlePointMove);
            }
        }

        return () => { };
    }, [...dependencies, isDragging]);

    return { isDragging };
};

export default useDrag;