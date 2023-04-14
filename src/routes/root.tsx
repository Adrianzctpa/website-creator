import { Link } from "react-router-dom";
import Draggable from "../components/draggable";
import { Nullable } from "../assets/types";
import { useState } from "react";

function Root() {
    const [element, setElement] = useState<Nullable<HTMLElement>>(null);

    function createDraggableElement() {
        let dragElement = document.createElement('div');
        dragElement.style.width = '100px';
        dragElement.style.height = '100px';
        dragElement.style.backgroundColor = 'red';
        dragElement.style.position = 'absolute';
        dragElement.style.cursor = 'grab';
        
        setElement(dragElement);
    }

    function createAnotherElement() {
        let dragElement = document.createElement('div');
        dragElement.style.width = '100px';
        dragElement.style.height = '100px';
        dragElement.style.backgroundColor = 'blue';
        dragElement.style.position = 'absolute';
        dragElement.style.cursor = 'grab';
        
        setElement(dragElement);
    }

    return (
        <div>
            <h1>Root</h1>
            <Link to="/error">Error</Link>
            <button onClick={createDraggableElement}>Create draggable element</button>
            <button onClick={createAnotherElement}>Create another element</button>
            {element != null ? <Draggable element={element} /> : <></>}
        </div>
    )
}

export default Root;