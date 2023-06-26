import React, {useEffect, useState} from "react";
import xIcon from '../assets/images/icon-x.svg'
import oIcon from '../assets/images/icon-o.svg'
import {useNavigate} from "react-router-dom";

interface IProp {
    handlePlayAgain: () => void,
    round: number,
    player: number,
    isCPU: boolean|null
}

const WinBox:React.FC<IProp> = ({handlePlayAgain, round, player, isCPU}) => {

    const [isTie, setIsTie] = useState(false)

    const navigate = useNavigate()

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
                {!isTie && !isCPU  && <span>Player {player} wins!</span>}
                <div className={`${!isTie && player === 1 && "playerOne" || !isTie && player === 2 &&  "playerTwo" || isTie && ""} takes-round`}>
                    {!isTie && <img src={`${!isTie && player === 1 && xIcon || !isTie && player === 2 && oIcon }`} alt="icon" />}
                    {!isTie ? "takes the round" : "Round tied"}
                </div>
                <div className="round-buttons">
                    <button className="quit" onClick={() => navigate('/')}>
                        <span>Quit</span>
                    </button>
                    <button className="next-round" onClick={handlePlayAgain}>
                        <span>Next Round</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WinBox