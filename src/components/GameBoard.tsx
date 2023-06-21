import dataGameGrid from '../assets/data/gamegrid.json'
import playedGridData from '../assets/data/checkGrid.json'
import React, {useEffect, useState} from "react";
import GameHeading from "./GameHeading.tsx";
import GameScore from "./GameScore.tsx";
import {cpuTurn} from "../functions/cpuTurn.ts";
import {GameGridInt} from "../interfaces/GameInt.ts";
import {checkPlayedGrid} from "../functions/checkPlayedGrid.ts";
import {switchPlayers} from "../functions/switchPlayers.ts";
import {checkResult, playedGridCheck} from "../functions/checkResult.ts";
import WinBox from "./WinBox.tsx";

interface IProp {
    mark: number|null,
    isCPU: boolean
}

const GameBoard:React.FC<IProp> = ({isCPU, mark}) => {

    const [player, setPlayer] = useState(1)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [isCPUTurn, setIsCPUTurn] = useState(false)
    const [gameGrid, setGameGrid] = useState<GameGridInt[]>(JSON.parse(JSON.stringify(dataGameGrid)))
    const [isResult, setIsResult] = useState(false)

    // Set start players
    // Player 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
        console.log("WHO: ", mark , "CPU: ", isCPU)
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
        /* if(!isCPU && mark) {
            console.log("It is a player vs. player game...")
            setIsPlayerTurn(true)
        }*/

    }, [isCPU, mark])

    // CPU function:
    // -> Check if the CPU is playing and if its turn.
    useEffect(() => {
        console.log("What does the gameGrid say: ", gameGrid)
        console.log("Check if it is the CPU players turn?")
        console.log("Who's turn is it? CPU: ", isCPUTurn, "Player: ", isPlayerTurn)
        console.log("Mark: ", mark)
        if(isCPU && isCPUTurn && !isResult) {
            setTimeout(() => {
                console.log("Setting time out (3 sec)")
                console.log("Calculating CPU turn")
                const res = cpuTurn(gameGrid) // <- This should return the chosen grid.
                if(res){
                    console.log("CPU plays: ", res)
                    handleClick(res)
                }
            }, 3000)
        } else {
            console.log("Does it check here?")
            setIsPlayerTurn(true)
        }
    }, [isCPU, isCPUTurn, isPlayerTurn])

    // A count-down (3sec) before doing an applying the grid calculation.
    // Grid calculation on what the CPU will use as the variables for col, row, line and id.
    // Then, need to call the handleClick function with all the variables.
    // Store in playedGrid
    // Switch player
    // And repeat ->

    // (player: number, col: string, row: string, line: string, id: number, checked: boolean)
    const handleClick = (gridId:number) => {
        console.log("User/CPU clicked: ", gridId)
        console.log("GameGrid before functions: ", gameGrid)
        console.log("Is it not empty?: ", playedGridData)
        setGameGrid(checkPlayedGrid(gameGrid, gridId, player))
        // Construct the grid check for the results
        const storePlayedGrid = playedGridCheck(gameGrid, player)
        console.log("PLAYED GRID: ", storePlayedGrid)
        //setPlayedGrid(storePlayedGrid)
        // console.log("Check result: ", checkResult(storePlayedGrid))
        const result = checkResult(storePlayedGrid)
        setIsResult(result)
        // Need to setPlayedGrid(checkPlayedGridRes) --> To store the value for the next round
        // Send the value to check result. Return player and false or true

        // const gameResult = gameResult(checkPlayedGridRes)

        // If true -> excecute the result DIV with results - Thinking of a module that shows if true with some passing data.
        if(!result) {
            changePlayer()
        }

        //if(playedGridRes) {
            // setPlayedGrid(playedGridRes)
            // setGameGrid(updateGameGrid(gameGrid))
        //}
        // Check if the CPU is playing and set who's next
    }

    useEffect(() => {
        if(isResult) {
            console.log("Does this run?")
            console.log("SHOW RESULT, START OVER THE GAME")
            if(isCPU) {
                setIsCPUTurn(false)
            }
            setIsPlayerTurn(false)
            console.log("Which player won? ", player)
            return
        }
    }, [isResult, isCPU])

    const changePlayer = () => {
        console.log("Does switch player run?")
        if(isCPU) {
            if(isCPUTurn) {
                setIsPlayerTurn(true)
                setIsCPUTurn(false)
            } else {
                setIsCPUTurn(true)
                setIsPlayerTurn(false)
            }
        } /* else {
            setIsCPUTurn(true)
        }*/
        setPlayer(switchPlayers(player))
    }

    const playAgain = () => {
        console.log("Play another round")
        // Reset all game data
        setPlayer(1)
        setIsPlayerTurn(false)
        setIsCPUTurn(false)
        setGameGrid(JSON.parse(JSON.stringify(dataGameGrid)))
        setIsResult(false)
    }


    return(
        <div>
            <div>
                <GameHeading />
            </div>
            <div>Player turn: {player}</div>
            {isResult && <WinBox playAgain={playAgain}/>}
            <div className="parent">
                {gameGrid && gameGrid.map(div => (
                    <div key={div.id}
                         onClick={() => {
                             if(isPlayerTurn) {
                                 handleClick(div.id)
                             }
                         }}
                         className={`checked`} data-target={`${div.user.toString()}`}>
                            {div.col} {div.row}
                    </div>
                ))}
            </div>
            <div>
                <GameScore gameComplete={isResult} player={player}/>
            </div>
        </div>
    )
}

export default GameBoard