import React, {useEffect, useState} from "react";
import xIcon from '../assets/images/icon-x.svg'
import oIcon from '../assets/images/icon-o.svg'

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
        <div className="backplate">
            <div className="score-screen">
                <span>Oh no, you lost...</span>
                <div className="takes-round playerOne">
                    <img src={xIcon} alt="x icon" />
                    takes the round
                </div>
                <div className="round-buttons">
                    <button className="quit">
                        <span>Quit</span>
                    </button>
                    <button className="next-round" onClick={playAgain}>
                        <span>{isTie ? "Play Again" : "Next Round" }</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WinBox