import { DragState } from "../assets/types";
import { useEffect, useRef, useState } from "react";
import "../assets/css/root.css"
import useDrag from "../assets/hooks/useDrag";

type Directions = {
    left: number,
    top: number,
}

function Root() {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const ref = useRef(null);
    const [directions, setDirections] = useState<Directions>({left: 0, top: 0});

    const handleMovement = (e: MouseEvent) => {
        const {pageX, pageY} = e;
        setDirections({left: pageX + 50, top: pageY + 50});
    }

    const getOffset = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
    }

    const drag = useDrag(ref, [directions], {
        onDrag: handleMovement,
        onLeave: (e: MouseEvent) => {
        },
    })

    function createDraggableElement() {
        let dragElement = document.createElement('div');
        dragElement.style.width = '100px';
        dragElement.style.height = '100px';
        dragElement.style.backgroundColor = 'red';
        dragElement.style.cursor = 'grab';
    }

    function createAnotherElement() {
        let dragElement = document.createElement('div');
        dragElement.style.width = '100px';
        dragElement.style.height = '100px';
        dragElement.style.backgroundColor = 'blue';
        dragElement.style.position = 'absolute';
        dragElement.style.cursor = 'grab';

       return dragElement
    }

    return (
        <>
            <h1>Root</h1>
            <button onClick={createDraggableElement}>Create draggable element</button>
            <button onClick={createAnotherElement}>Create another element</button>

            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={"redbox"}>Example Div</div>
            <div ref={ref} style={{
                position: 'absolute',
                left: directions.left,
                top: directions.top,
                width: '200px',
                height: '200px',
                backgroundColor: 'blue'
            }}></div>
        </> 
    )
}

export default Root;
