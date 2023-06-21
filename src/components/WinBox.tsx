import React, {useEffect, useState} from "react";

interface IProp {
    playAgain: () => void,
    round: number
}

const WinBox:React.FC<IProp> = ({playAgain, round}) => {

    const [isTie, setIsTie] = useState(false)

    console.log(round)

    useEffect(() => {
        if(round === 10) {
            setIsTie(true)
        } else {
            setIsTie(false)
        }
    }, [round])

    return(
        <div>
            WIN SCREEN
            <button onClick={playAgain}>{isTie ? "Play Again" : "Next Round" }</button>
        </div>
    )
}

export default WinBox