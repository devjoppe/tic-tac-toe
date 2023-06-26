import dataGameGrid from '../assets/data/gamegrid.json'
// import playedGridData from '../assets/data/checkGrid.json'
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

    // Set start players
    // Player 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
        // Reset restartGame
        setRestartGame(false)
        setIsRestartGame(false)
       /*  if(isCPU && mark) {
            // If it is a CPU game
            if(mark === 1) {
                // Player is starting
                setIsPlayerTurn(true)
            } else {
               // CPU is starting
                setIsCPUTurn(true)
            }
        }*/
        // Testing out some other code ->
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
        if(isResult) {
            if(isCPU) {
                setIsCPUTurn(false)
            }
            setIsPlayerTurn(false)
            return
        }
    }, [isResult, isCPU])

    // Function to change player each round
    const changePlayer = () => {
       /* if(isCPU) {
            if(isCPUTurn) {
                setIsPlayerTurn(true)
                setIsCPUTurn(false)
            } else {
                setIsCPUTurn(true)
                setIsPlayerTurn(false)
            }
        }*/
        // Testing out this code:
        if (isCPU) {
            setIsPlayerTurn((prevIsPlayerTurn) => !prevIsPlayerTurn);
            setIsCPUTurn((prevIsCPUTurn) => !prevIsCPUTurn);
        }
        setPlayer(switchPlayers(player))
    }

    // Reset current and start a new round
    const playAgain = () => {
        // Reset all game data
        setPlayer(1)
        setIsPlayerTurn(false)
        //Todo: Need to check if human is Player 2. If so, CPU will start first.
        setIsCPUTurn(false)
        setGameGrid(JSON.parse(JSON.stringify(dataGameGrid)))
        setRound(1)
        setIsResult(false)
    }

    const viewRestartGame = (viewRestart:boolean, restart:boolean) => {
        viewRestart ? setRestartGame(true) : setRestartGame(false)
        if(restart) {
            setIsRestartGame(true)
        }
    }

    return(
        <div>
            { restartGame && <QuitBox viewRestartGame={viewRestartGame} /> }
            <div>
                <GameHeading player={player} viewRestartGame={viewRestartGame} />
            </div>
            {isWaitingForCPU && "WAITING FOR CPU MOVE"}
            <div className="parent">
                    {gameGrid && gameGrid.map(div => (
                        <div className="grid-item" key={div.id}>
                            <div onClick={() => {
                                     if(isPlayerTurn) {
                                         handleClick(div.id)
                                     }
                                 }}
                                 className={`checked`} data-target={`${div.user.toString()}`}>
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