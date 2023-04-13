import { useRef } from 'react';

function Draggable ({element} : {element: HTMLElement}) {
    const dragProps = useRef<{x: number, y: number, left: number, top: number}>({x: 0, y: 0, left: 0, top: 0})
  
    const initDrag = (e: MouseEvent) => {
        const node = e.target as HTMLElement
        const x = e.clientX 
        const y = e.clientY 
        const { left, top } = node.getBoundingClientRect() as DOMRect
        
        dragProps.current = {
            x: x, 
            y: y, 
            left: left - element.offsetLeft, 
            top: top - element.offsetTop
        }

        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', endDrag)
    }

    const drag = (e: MouseEvent) => {
        element.style.transform = `translate(${dragProps.current.left + e.clientX - dragProps.current.x}px, ${dragProps.current.top + e.clientY - dragProps.current.y}px)`
        console.log(element.style.transform)
    }

    const endDrag = () => {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', endDrag)
    }

    element.addEventListener('mousemove', (e: MouseEvent) => {
        if (e.buttons === 1) {
            initDrag(e)
        }   
    })

    return (
        <div ref={ref => ref?.appendChild(element)} />
    )
}

export default Draggable;