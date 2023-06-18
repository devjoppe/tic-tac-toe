import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import GameBoard from "../components/GameBoard.tsx";

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
    }, [isCPU, mark, navigate])

    return(
        <div>
            <GameBoard isCPU={isCPU} mark={mark} />
        </div>
    )
}

export default GamePage