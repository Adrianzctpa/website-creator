export type Nullable<T> = T | null;

export type DragProps = {
    onDrag: (e: MouseEvent) => any;
    onLeave: (e: MouseEvent) => any;
}

export type DragState = {
    left: number,
    top: number,
}