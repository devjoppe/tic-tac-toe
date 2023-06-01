// Import style
import './assets/style/css/style.css'

import data from './assets/data/gamegrid.json'
import {useEffect, useState} from "react";

interface GameGridInt {
    id: number,
    col: string,
    row: string,
    checked?: boolean,
    user: string
}

function App() {

    const [gameGrid, setGameGrid] = useState<GameGridInt[]>([])
    const [playedGrid, setPlayedGrid] = useState<GameGridInt[]>([])

    useEffect(() => {
        setGameGrid(data)
    }, [])

    const handleClick = (user:string, col:string, row:string, id:number) => {
        // Save played grids in new array that checks the game grid score
        setPlayedGrid([...playedGrid, {
            id: id,
            col: col,
            row: row,
            user: user
        }])

        // Update gameGrid with new game data
        setGameGrid(id, {
            user: "userA"
        })
    }

    return (
        <div className="parent">
            {gameGrid && gameGrid.map(div => (
                <div onClick={() => handleClick(div.user, div.col, div.row, div.id)} className={`checked ${div.user}`} data-col={div.col} data-id={div.id}  data-row={div.row} >{div.col} {div.row}</div>
            ))}
        </div>
    )
    }

export default App
