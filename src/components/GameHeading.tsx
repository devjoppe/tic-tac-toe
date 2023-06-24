import React from "react";
import logo from '../assets/images/logo.svg'
import Xturn from "../assets/images/start-x-icon.svg"
import Oturn from "../assets/images/start-o-icon.svg"

interface IProp {
    player: number
}

const GameHeading:React.FC<IProp> = ({player}) => {
    return(
        <div className="game-heading">
            <div className="logo-heading"><img src={logo} alt="Logo" /></div>
            <div className="player-turn">
                <img src={player === 1 ? Xturn : Oturn} alt="Player turn icon" />
                <span>TURN</span>
            </div>
            <div className="restart-game">X</div>
        </div>
    )
}

export default GameHeading