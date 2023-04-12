import { Link } from "react-router-dom";

function Root() {
    return (
        <div>
            <h1>Root</h1>
            <Link to="/error">Error</Link>
        </div>
    )
}

export default Root;