import React, {useState} from "react";
import logo from '../assets/images/logo.svg'

interface IProp {
    newGame :(isCPU:boolean, mark:number ) => void
}

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
                    <button onClick={() => setMark(1)}>MARK X</button>
                    <button onClick={() => setMark(2)}>MARK O</button>
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