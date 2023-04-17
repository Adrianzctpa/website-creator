import { DragState } from "../assets/types";
import { useEffect, useRef, useState } from "react";
import "../assets/css/root.css"
import useDrag from "../assets/hooks/useDrag";

function Root() {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const ref = useRef(null);
    const [translate, setTranslate] = useState<DragState>({x: 0, y: 0});

    const handleDrag = (e: MouseEvent) => {
        const {movementX, movementY} = e;
        setTranslate({x: translate.x + movementX, y: translate.y + movementY});
    }

    const getOffset = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
    }

    const drag = useDrag(ref, [translate], {
        onDrag: handleDrag,
        onPointDown: (e: MouseEvent) => {
        },
        onPointMove: (e: MouseEvent) => {
        },
        onPointUp: (e: MouseEvent) => {
            if (!ref.current) return

            let element = ref.current as HTMLElement;
            const offsets = getOffset(element)
            let el = document.elementFromPoint(offsets.left, offsets.top)

            if (el) {
                element.style.transform = `translate(0px, 0px)`
                el.appendChild(element)
            } 
        }
    })

    useEffect(() => {
        if (isHovering) {
            console.log("Hovering")
        } else {
            console.log("Not hovering")
        }
    }, [isHovering])

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
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                width: '100px',
                height: '100px',
                backgroundColor: 'blue'
            }}></div>
        </> 
    )
}

export default Root;