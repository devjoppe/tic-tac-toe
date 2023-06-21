// Import style
import './assets/style/css/style.css'

import {useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import StartPage from "./pages/StartPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import FourOhFour from "./pages/FourOhFour.tsx";

function App() {

    // New game
    const [isCPU, setIsCPU] = useState<boolean|null>(null)
    const [mark, setMark] = useState<number|null>(null)

    const navigate = useNavigate()

    const newGame = (isCPU:boolean, mark:number) => {
        setMark(mark)
        setIsCPU(isCPU)
        if(mark && isCPU || !isCPU) {
            navigate('/game')
        }
    }

    return (
        <Routes>
            <Route path="/" element={<StartPage newGame={newGame} />} />
            <Route path="/game" element={<GamePage isCPU={isCPU} mark={mark}/>} />
            <Route path="*" element={<FourOhFour />} />
        </Routes>
    )
}

export default App
