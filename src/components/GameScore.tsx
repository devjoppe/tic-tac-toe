import React, {useEffect, useState} from "react";
import WinBox from "./WinBox.tsx";

interface IProp {
    gameComplete: boolean,
    player: number,
    round: number,
    mark: number|null
    isCPU: boolean|null
    playAgain: () => void
}

const GameScore:React.FC<IProp> = ({
    gameComplete,
    player,
    round,
    mark,
    isCPU,
    playAgain}) => {

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

    return(
        <>
            { gameComplete && <WinBox handlePlayAgain={handlePlayAgain} round={round} player={player} isCPU={isCPU}/> }
            <div className="score-view">
                <div className="player_1_score">
                    <span>{isCPU && mark === 1 ? "X (You)" : "X"}</span>
                    <span className="score">{playerOne}</span>
                </div>
                <div className="player_ties">
                    <span>TIES</span>
                    <span className="score">{ties}</span>
                </div>
                <div className="player_2_score">
                    <span>{isCPU && mark === 2 ? "O (You)" : "O"}</span>
                    <span className="score">{playerTwo}</span>
                </div>
            </div>
        </>
    )
}

export default GameScore