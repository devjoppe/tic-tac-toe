import React, {useEffect, useState} from "react";
import WinBox from "./WinBox.tsx";

interface IProp {
    gameComplete: boolean,
    player: number,
    round: number,
    mark: number|null
    isCPU: boolean|null
    playAgain: () => void,
    restartGame: boolean
}

const GameScore:React.FC<IProp> = ({
    gameComplete,
    player,
    round,
    mark,
    isCPU,
    playAgain,
    restartGame}) => {

    const [playerOne, setPlayerOne] = useState(0)
    const [playerTwo,setPlayerTwo] = useState(0)
    const [ties, setTies] = useState(0)

    // Check who won or if tie
    useEffect(() => {
        if(gameComplete) {
            if(player === 1 && round < 10) {
                setPlayerOne(current => current+1)
            }
            if(player === 2 && round < 10) {
                setPlayerTwo(current => current+1)
            }
            if(round === 10) {
                setTies(current => current+1)
                return
            }
        }
    }, [gameComplete, player])

    const handlePlayAgain = () => {
        //prop-drilling ;)
        playAgain()
    }

    useEffect(() => {
        if(restartGame) {
            setPlayerOne(0)
            setPlayerTwo(0)
            playAgain()
        }
    }, [restartGame])

    return(
        <>
            { gameComplete && <WinBox handlePlayAgain={handlePlayAgain} round={round} player={player} isCPU={isCPU} mark={mark}/> }
            <div className="score-view">
                <div className="player_1_score">
                    {isCPU && <span>{ mark === 1 ? "X (YOU)" : "X (CPU)"}</span>}
                    {!isCPU && <span>{ mark === 1 ? "X (P1)" : "X (P2)"}</span>}
                    <span className="score">{playerOne}</span>
                </div>
                <div className="player_ties">
                    <span>TIES</span>
                    <span className="score">{ties}</span>
                </div>
                <div className="player_2_score">
                    {isCPU && <span>{ mark === 2 ? "O (YOU)" : "O (CPU)"}</span>}
                    {!isCPU &&  <span>{ mark === 2 ? "O (P1)" : "O (P2)"}</span>}
                    <span className="score">{playerTwo}</span>
                </div>
            </div>
        </>
    )
}

export default GameScore