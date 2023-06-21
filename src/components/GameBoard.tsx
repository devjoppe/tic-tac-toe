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
    const [round, setRound] = useState(1)
    const [isResult, setIsResult] = useState(false)

    // Set start players
    // Player 1 is always starting.
    // Check if it is a CPU game or not, then set players
    useEffect(() => {
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
            setTimeout(() => {
                // Computing the CPU move
                const res = cpuTurn(gameGrid)
                if(res){
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
        console.log("Count round: ", round)
        if(round === 9) {
            console.log("Does this run inside round")
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

    const playAgain = () => {
        // Reset all game data
        setPlayer(1)
        setIsPlayerTurn(false)
        setIsCPUTurn(false)
        setGameGrid(JSON.parse(JSON.stringify(dataGameGrid)))
        setRound(1)
        setIsResult(false)
    }

    return(
        <div>
            <div>
                <GameHeading />
            </div>
            <div>Player turn: {player}</div>
            {isResult && <WinBox playAgain={playAgain} round={round}/>}
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
                <GameScore gameComplete={isResult} player={player} round={round}/>
            </div>
        </div>
    )
}

export default GameBoard