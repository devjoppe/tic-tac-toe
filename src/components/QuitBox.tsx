import React from "react";

interface IProp {
    viewRestartGame: (viewRestart:boolean, restart: boolean) => void
}

const QuitBox:React.FC<IProp> = ({viewRestartGame}) => {
    return(
        <div className="backplate">
            <div className="score-screen">
                <div className="takes-round">
                    Restart game?
                </div>
                <div className="round-buttons">
                    <button className="quit" onClick={() => viewRestartGame(false, false)}>
                        <span>No, Cancel</span>
                    </button>
                    <button className="next-round" onClick={() => viewRestartGame(false, true)}>
                        <span>Yes, restart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuitBox