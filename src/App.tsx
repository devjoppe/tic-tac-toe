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
    const [player, setPlayer] = useState ("userA")

    useEffect(() => {
        setGameGrid(data)
    }, [])

    useEffect(() => {
        // Checking grid results
        const checkGridResults = () => {
            // Get the checked by the player
            if(playedGrid && playedGrid.length != 0) {
                //console.log({playedGrid})
                console.log({player})
                const playerGrids = playedGrid.map(grid => {
                    if(grid.user === player) {
                        return grid
                    }
                }).filter(Boolean)
                console.log({playerGrids})
                switchPlayers()
            }
        }
        // Call to check the players results with played grids
        checkGridResults()
    }, [playedGrid])

    const switchPlayers = () => {
        if(player === "userA") {
            setPlayer ("userB")
        } else {
            setPlayer ("userA")
        }
    }

    const handleClick = (user:string, col:string, row:string, id:number, checked:boolean|undefined) => {
        if(checked) {
            return
        }
        // Call Save played grids
        savePlayedGrid(user, col, row, id)
        // Call Update gameGrid with new game data
        updateGameGrid(id)
    }

    // Save played grids
    const savePlayedGrid = (user:string, col:string, row: string, id: number) => {
        // Save played grids in new array that checks the game grid score
        const newPlayed:GameGridInt[] = [...playedGrid, {
            id: id,
            col: col,
            row: row,
            user: user
        }]
        setPlayedGrid(newPlayed)
        // Call check grid results
    }

    const updateGameGrid = (id:number) => {
        const updateGrid = [...gameGrid]
        const targetGrid = updateGrid.find(grid => grid.id === id)

        if(targetGrid) {
            targetGrid.user = player
            targetGrid.checked = true
        }
        setGameGrid(updateGrid)
    }

    //console.log({player})
    //console.log({playedGrid})
    //console.log({gameGrid})

    return (
        <>
            <div className="parent">
                {gameGrid && gameGrid.map(div => (
                    <div key={div.id} onClick={() => handleClick(player, div.col, div.row, div.id, div.checked)} className={`checked ${div.user}`} data-col={div.col} data-id={div.id}  data-row={div.row} >{div.col} {div.row}</div>
                ))}
            </div>
            <div>{player}</div>
        </>
    )
    }

export default App
