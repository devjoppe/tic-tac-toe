import React, {useState} from "react";
import logo from '../assets/images/logo.svg'
import iconXSelected from '../assets/images/start-x-icon-selected.svg'
import iconX from '../assets/images/start-x-icon.svg'
import iconOSelected from '../assets/images/start-o-icon-selected.svg'
import iconO from '../assets/images/start-o-icon.svg'

interface IProp {
    newGame :(isCPU:boolean, mark:number ) => void
}

const playerSelectMenu = [
    {
        mark: 1,
        icon: iconX,
        icon_select: iconXSelected,
        text: "Player One"
    },
    {
        mark: 2,
        icon: iconO,
        icon_select: iconOSelected,
        text: "Player Two"
    }
]

const StartPage:React.FC<IProp> = ({newGame}) => {

    const [mark, setMark] = useState<number>(1)

    const saveSettings = (isCPU:boolean) => {
        newGame(isCPU, mark)
    }

    return(
        <div  className="start-container">
            <div className="logo">
                <img alt="Logo" src={logo} />
            </div>
            <div className="pick-players">
                <span>Pick players 1's mark</span>
                <div className="buttons">
                    { playerSelectMenu.map(item => (
                        <button key={item.mark} className={mark === item.mark ? `selected` : ``} onClick={() => setMark(item.mark)}>
                            <img src={mark === item.mark ? item.icon_select : item.icon} alt={item.text} />
                        </button>
                    ))}
                </div>
                <span className="info">Remember: X goes first</span>
            </div>
            <div className="choose-game">
                <button className="cpu" onClick={() => saveSettings(true)}><span>New Game (VS CPU)</span></button>
                <button className="player" onClick={() => saveSettings(false)}><span>New Game (VS PLAYER)</span></button>
            </div>
        </div>
    )
}

export default StartPage