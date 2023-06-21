import React from "react";

interface IProp {
    playAgain: () => void
}

const WinBox:React.FC<IProp> = ({playAgain}) => {
    return(
        <div>
            WIN SCREEN
            <button onClick={playAgain}>Next Round</button>
        </div>
    )
}

export default WinBox