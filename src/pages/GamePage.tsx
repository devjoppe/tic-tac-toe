import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface IProp {
    isCPU: boolean|null,
    mark: number|null
}

const GamePage:React.FC<IProp> = ({isCPU, mark}) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(!isCPU || !mark) {
            console.error("Game did not start correctly")
            navigate('*')
            return
        }
        console.log(isCPU, mark)
    }, [isCPU, mark])

    return(
        <div>
            GAMEPAGE
        </div>
    )
}

export default GamePage