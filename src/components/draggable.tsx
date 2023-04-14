import { useRef } from 'react';

// This is a custom component that allows you to drag an element around the screen
// Only one draggable element can be dragged at a time
// Shall the html to check for elements not be given, parentNode will be used

function Draggable ({element, html} : {element: HTMLElement, html?: string}) {
    enum buttons {
        LEFT_CLICK = 1,
        RIGHT_CLICK = 2,
        MIDDLE_CLICK = 4
    }

    const dragProps = useRef<{x: number, y: number, left: number, top: number}>({x: 0, y: 0, left: 0, top: 0})

    const checkElementsForDraggable = (html: string) => {
        const div = document.createElement('div')
        div.innerHTML = html
        const elements = div.querySelectorAll('[draggable=true]')
        if (elements.length > 1) {
            return true
        } 
        return false
    }
  
    const initDrag = (e: MouseEvent) => {
        let tempHtml = html
        if (html === undefined) {
            let node = element.parentNode as HTMLElement

            tempHtml = node.outerHTML
        }

        if (checkElementsForDraggable(tempHtml as string)) {
            element.draggable = false
            return
        }


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
        element.draggable = true
    }

    const drag = (e: MouseEvent) => {
        if (!element.draggable) return
        element.style.transform = `translate(${dragProps.current.left + e.clientX - dragProps.current.x}px, ${dragProps.current.top + e.clientY - dragProps.current.y}px)`
    }

    const endDrag = () => {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', endDrag)
        element.draggable = false
    }

    element.addEventListener('mousemove', (e: MouseEvent) => {
        if (e.buttons === buttons.LEFT_CLICK) {
            initDrag(e)
        }   
    })

    return (
        <div ref={ref => ref?.appendChild(element)} />
    )
}

export default Draggable;