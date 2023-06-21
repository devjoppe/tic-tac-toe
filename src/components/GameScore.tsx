import React, {useEffect, useState} from "react";

interface IProp {
    gameComplete: boolean,
    player: number,
    round: number
}

const GameScore:React.FC<IProp> = ({gameComplete, player, round}) => {

    const [playerOne, setPlayerOne] = useState(0)
    const [playerTwo,setPlayerTwo] = useState(0)

    useEffect(() => {
        if(gameComplete) {
            if(player === 1 && round < 10) {
                setPlayerOne(current => current+1)
            }
            if(player === 2 && round < 10) {
                setPlayerTwo(current => current+1)
            }
            if(round === 10) {
                console.log("It is a tie round")
                return
            }
        }
    }, [gameComplete, player])

    return(
        <div>
            <div>Player 1 score: {playerOne}</div>
            <div>Ties</div>
            <div>Player 2 score: {playerTwo}</div>
        </div>
    )
}

export default GameScore