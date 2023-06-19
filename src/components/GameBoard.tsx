import dataGameGrid from '../assets/data/gamegrid.json'
import React, {useEffect, useState} from "react";
import GameHeading from "./GameHeading.tsx";
import GameScore from "./GameScore.tsx";
import {cpuTurn} from "../functions/cpuTurn.ts";
import {GameGridInt} from "../interfaces/GameInt.ts";
import {checkPlayedGrid} from "../functions/checkPlayedGrid.ts";
import {updateGameGrid} from "../functions/updateGameGrid.ts";

interface IProp {
    mark: number|null,
    isCPU: boolean|null
}

const GameBoard:React.FC<IProp> = ({isCPU, mark}) => {

    const [player, setPlayer] = useState(1)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [isCPUTurn, setIsCPUTurn] = useState(false)

    const [gameGrid, setGameGrid] = useState<GameGridInt[]>(dataGameGrid)
    const [playedGrid, setPlayedGrid] = useState<GameGridInt[]>([])

    // Set start players
    // Player 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
        console.log("WHO: ", mark)
        // Start the Player vs. CPU game
        if(isCPU && mark) {
            console.log("It is a CPU game")
            if(mark === 1) {
                // Player is starting
                console.log("Player is starting")
                setIsPlayerTurn(true)
            } else {
                console.log("CPU is starting")
                setIsCPUTurn(true)
                // CPU is starting
                // const res = cpuTurn(gameGrid)
                // Run the function that handles the CPU logic

            }
        }
        // Start Player vs. Player game. Player 1 always start
        if(!isCPU && mark) {
            setIsPlayerTurn(true)
        }

    }, [isCPU, mark])

    // CPU function:
    // -> Check if the CPU is playing and if its turn.
    useEffect(() => {
        if(isCPU && isCPUTurn) {
            console.log("Calculating CPU turn")
            const res = cpuTurn(gameGrid) // <- This should return the chosen grid.
            if(res){
                console.log("CPU plays: ", res)
                handleClick(res)
            }
        } else {
            return
        }
    }, [isCPU, isCPUTurn])

    // A count-down (3sec) before doing an applying the grid calculation.
    // Grid calculation on what the CPU will use as the variables for col, row, line and id.
    // Then, need to call the handleClick function with all the variables.
    // Store in playedGrid
    // Switch player
    // And repeat ->

    // (player: number, col: string, row: string, line: string, id: number, checked: boolean)
    const handleClick = (gridId:number) => {
        console.log("User/CPU clicked: ", gridId)
        //const playedGridRes = checkPlayedGrid()
        //if(playedGridRes) {
            // setPlayedGrid(playedGridRes)
            // setGameGrid(updateGameGrid(gameGrid))
        //}
        // Check if the CPU is playing
        if(isCPU && !isCPUTurn) {
            setIsCPUTurn(true)
            setIsPlayerTurn(false)
        } else {
            setIsPlayerTurn(true)
        }
    }

    useEffect(() => {
        // Run this after every game change.
        // checkResult(playedGrid, gameGrid)
    }, [gameGrid])

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
                                 handleClick(div.id)
                             }
                         }}
                         className={`checked ${div.user.toString()}`}>
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