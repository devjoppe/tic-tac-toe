import {Link} from "react-router-dom";

const FourOhFour = () => {
    return(
        <div>
            Game did not start correctly...?
            <div>
                <Link to={`/`}>Go to game start page</Link>
            </div>
        </div>
    )
}

export default FourOhFour