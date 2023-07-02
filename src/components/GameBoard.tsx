import dataGameGrid from '../assets/data/gamegrid.json'
import React, {useEffect, useState} from "react";
import GameHeading from "./GameHeading.tsx";
import GameScore from "./GameScore.tsx";
import {cpuTurn} from "../functions/cpuTurn.ts";
import {GameGridInt} from "../interfaces/GameInt.ts";
import {checkPlayedGrid} from "../functions/checkPlayedGrid.ts";
import {switchPlayers} from "../functions/switchPlayers.ts";
import {checkResult, playedGridCheck} from "../functions/checkResult.ts";
import QuitBox from "./QuitBox.tsx";

interface IProp {
    mark: number|null,
    isCPU: boolean|null
}

const GameBoard:React.FC<IProp> = ({isCPU, mark}) => {

    const [player, setPlayer] = useState(1)
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)
    const [isCPUTurn, setIsCPUTurn] = useState(false)
    const [gameGrid, setGameGrid] = useState<GameGridInt[]>(JSON.parse(JSON.stringify(dataGameGrid)))
    const [round, setRound] = useState(1)
    const [isResult, setIsResult] = useState(false)
    const [isWaitingForCPU, setIsWaitingForCPU] = useState(false)
    const [restartGame, setRestartGame] = useState(false)
    const [isRestartGame, setIsRestartGame] = useState(false)
    const [completedGrid, setCompletedGrid] = useState<string|null>("")
    const [isXLine, setIsXLine] = useState(false)

    // Set start players
    // Player 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
        // Reset restartGame
        setRestartGame(false)
        setIsRestartGame(false)

        // set players
        if (isCPU && mark) {
            setIsPlayerTurn(mark === 1);
            setIsCPUTurn(mark !== 1);
        }
    }, [isCPU, mark])

    // Check if the CPU is playing and if its turn.
    useEffect(() => {
        if(isCPU && isCPUTurn && !isResult) {
            setIsWaitingForCPU(true)
            setTimeout(() => {
                // Computing the CPU move
                const res = cpuTurn(gameGrid)
                if(res){
                    setIsWaitingForCPU(false)
                    handleClick(res)
                }
            }, 3000)
        } else {
            setIsPlayerTurn(true)
        }
    }, [isCPU, isCPUTurn, isPlayerTurn])

    // Player and CPU runs handleClick on each turn
    const handleClick = (gridId:number) => {
        setGameGrid(checkPlayedGrid(gameGrid, gridId, player))

        // Construct the grid check for the results
        const storePlayedGrid = playedGridCheck(gameGrid, player)
        const result = checkResult(storePlayedGrid)

        // Todo: Mark the grid items on the game board after finished result
        // Check marked grids and display if round is completed
        console.log("gameGrid: ", gameGrid)
        console.log("storePlayedGrid: ", storePlayedGrid)
        const threeTimes = storePlayedGrid.filter(item => item.times === 3)
        const checkLinesCorners = storePlayedGrid
            .filter(item =>
                (item.grid === "LEFT" || item.grid ===  "RIGHT") && item.times === 2)
        const checkLineMiddle = storePlayedGrid.filter(item => item.grid === "MIDDLE" && item.times === 1)
        console.log("checkLinesCorners: ", checkLinesCorners, "checkLineMiddle", checkLineMiddle)
        if(checkLinesCorners && checkLineMiddle) {
            console.log("The corner and middle lines is DONE!!")
        }
        console.log("threeTimes: ", threeTimes[0] && threeTimes[0].grid)
        if(threeTimes[0]) {
            setCompletedGrid(threeTimes[0].grid.toString())
        }
        console.log("completedGrid first: ", completedGrid)
        // Todo: Easiest thing would be to add another prop to the gameGrid to check everyone with correct letter?

        // =================================================================================

        // Set the result from the check
        setIsResult(result)
        // If it is a tie
        if(round === 9) {
            setIsResult(true)
        }

        // If false, change player and count rounds
        if(!result) {
            setRound(current => current + 1)
            changePlayer()
        }
    }

    // Handles the result. If true the round is complete
    useEffect(() => {
        console.log("completedGrid second: ", completedGrid)
        if(isResult) {
            if(isCPU) {
                setIsCPUTurn(false)
            }
            setIsPlayerTurn(false)
            return
        }
    }, [isResult, isCPU, completedGrid])

    // Function to change player each round
    const changePlayer = () => {
        if (isCPU) {
            setIsPlayerTurn((prevIsPlayerTurn) => !prevIsPlayerTurn);
            setIsCPUTurn((prevIsCPUTurn) => !prevIsCPUTurn);
        }
        setPlayer(switchPlayers(player))
    }

    // Reset current and start a new round
    const playAgain = () => {
        // Reset all game data
        if(isCPU && mark === 2) {
            setIsCPUTurn(true)
        } else {
            setIsCPUTurn(false)
        }
        setPlayer(1)
        setGameGrid(JSON.parse(JSON.stringify(dataGameGrid)))
        setRound(1)
        setIsResult(false)
        setCompletedGrid("")
    }

    const viewRestartGame = (viewRestart:boolean, restart:boolean) => {
        viewRestart ? setRestartGame(true) : setRestartGame(false)
        if(restart) {
            setIsRestartGame(true)
        }
    }

    return(
        <div className="game-board">
            { restartGame && <QuitBox viewRestartGame={viewRestartGame} /> }
            <div>
                <GameHeading player={player} viewRestartGame={viewRestartGame} />
            </div>
            {isWaitingForCPU && "WAITING FOR CPU MOVE"}
            <div className="parent">
                    {gameGrid && gameGrid.map(div => (
                        <div className="grid-item" key={div.id} data-completed={`${completedGrid && completedGrid === div.col || completedGrid === div.row} ${div.user.toString()}`}>
                            <div onClick={() => {
                                     if(isPlayerTurn) {
                                         handleClick(div.id)
                                     }
                                 }}
                                 className={`checked player-${player}`} data-target={`${div.user.toString()}`}>
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <GameScore gameComplete={isResult} player={player} round={round} mark={mark} isCPU={isCPU} playAgain={playAgain} restartGame={isRestartGame} />
            </div>
        </div>
    )
}

export default GameBoard