import React from "react";

interface IProp {
    player: number
}

const GameHeading:React.FC<IProp> = ({player}) => {
    return(
        <div>
            <div>LOGO</div>
            <div>Player turn: {player}</div>
            <div>Restart the game</div>
        </div>
    )
}

export default GameHeading