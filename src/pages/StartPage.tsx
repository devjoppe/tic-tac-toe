import React, {useState} from "react";

interface IProp {
    newGame :(isCPU:boolean, mark:number ) => void
}

const StartPage:React.FC<IProp> = ({newGame}) => {

    const [mark, setMark] = useState<number>(1)

    const saveSettings = (isCPU:boolean) => {
        newGame(isCPU, mark)
    }

    return(
        <div>
            <div>
                <button onClick={() => setMark(1)}>MARK X</button>
                <button onClick={() => setMark(2)}>MARK O</button>
            </div>
            <div>
                <button onClick={() => saveSettings(true)}>New Game (VS CPU)</button>
                <button onClick={() => saveSettings(false)}>New Game (VS PLAYER)</button>
            </div>
        </div>
    )
}

export default StartPage