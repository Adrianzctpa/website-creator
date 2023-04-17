export type Nullable<T> = T | null;

export type DragProps = {
    onPointDown: (e: MouseEvent) => void;
    onPointMove: (e: MouseEvent) => void;
    onPointUp: (e: MouseEvent) => void;
    onDrag: (e: MouseEvent) => void;
}

export type DragState = {
    x: number,
    y: number,
}