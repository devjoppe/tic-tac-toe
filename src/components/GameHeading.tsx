import React from "react";
import logo from '../assets/images/logo.svg'
import xTurn from "../assets/images/start-x-icon.svg"
import oTurn from "../assets/images/start-o-icon.svg"
import restartIcon from "../assets/images/icon-restart.svg"

interface IProp {
    player: number
}

const GameHeading:React.FC<IProp> = ({player}) => {
    return(
        <div className="game-heading">
            <div className="logo-heading"><img src={logo} alt="Logo" /></div>
            <div className="player-turn">
                <img src={player === 1 ? xTurn : oTurn} alt="Player turn icon" />
                <span>TURN</span>
            </div>
            <div className="restart-game">
                <button className="restart-button">
                    <img src={restartIcon} alt="Restart game" />
                </button>
            </div>
        </div>
    )
}

export default GameHeading