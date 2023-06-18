import gameGrid from '../assets/data/gamegrid.json'
import React, {useEffect, useState} from "react";
import GameHeading from "./GameHeading.tsx";
import GameScore from "./GameScore.tsx";

interface IProp {
    mark: number|null,
    isCPU: boolean|null
}

const GameBoard:React.FC<IProp> = ({isCPU, mark}) => {

    const [player, setPlayer] = useState(1)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)

    // Set start players
    // X = 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
        if(isCPU && mark) {
            console.log("It is a CPU game")
            if(mark === 1) {
                // Player is starting
                setIsPlayerTurn(true)
            } else {
                // CPU is starting
            }
        }
    }, [isCPU, mark])

    const handleClick = () => {
        console.log("User/CPU clicked")
    }

    return(
        <div>
            <div>
                <GameHeading />
            </div>
            <div className="parent">
                {gameGrid && gameGrid.map(div => (
                    <div key={div.id}
                         onClick={() => {
                             if(isPlayerTurn) {
                                 handleClick(player, div.col, div.row, div.id, div.checked, div.line)
                             }
                         }}
                         className={`checked ${div.user}`}>
                            {div.col} {div.row}
                    </div>
                ))}
            </div>
            <div>
                <GameScore />
            </div>
        </div>
    )
}

export default GameBoard