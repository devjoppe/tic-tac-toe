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
    line?: string
}

interface GameFieldInt {
    grid: string,
    times: number,
    lines: number,
    user: string,
    line?: string|undefined
}

function App() {

    const [gameGrid, setGameGrid] = useState<GameGridInt[]>([])
    const [playedGrid, setPlayedGrid] = useState<GameGridInt[]>([])
    const [player, setPlayer] = useState ("userA")

    const [isLine, setIsLine] = useState(false)
    const [isMiddle, setIsMiddle] = useState(false)

    const gameField:GameFieldInt[] = [
        {
            grid: "A",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "B",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "C",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "D",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "E",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "F",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "RIGHT",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "LEFT",
            times: 0,
            lines: 0,
            user: ""
        },
        {
            grid: "MIDDLE",
            times: 0,
            lines: 0,
            user: ""
        },
    ]

    useEffect(() => {
        setGameGrid(data)
    }, [])

    useEffect(() => {
        // Checking grid results
        const checkGridResults = () => {
            // Get the checked by the player
            if(playedGrid && playedGrid.length != 0) {
                console.log({player})
                const playerGrids = playedGrid.map(grid => {
                    if(grid.user === player) {
                        return grid
                    }
                }).filter(Boolean)

                // Check the result
                const lineCounter:string[] = []
                gameField.forEach(letter => {
                    playerGrids.map(grid => {
                        if(grid && letter.grid === grid.col || grid && letter.grid === grid.row || grid && letter.grid === grid.line) {
                            letter.times +=1
                            letter.user = player
                            if(grid.line === "LEFT" || grid.line === "RIGHT" || grid.line === "MIDDLE") {
                                letter.lines += 1
                                letter.user = player
                            }
                        }
                    })
                    if(letter.times === 3) {
                        console.log("Done times")
                        setIsLine(true)
                        return
                    }
                    const checkLine:string[] = ['LEFT', 'RIGHT']
                    if(letter.grid === 'MIDDLE' && letter.times === 1) {
                        console.log("setIsMiddle????")
                        setIsMiddle(true)
                    }
                    checkLine.forEach(item => {
                        if(letter.grid === item && letter.lines === 2) {
                            console.log("setIsLine????")
                            setIsLine(true)
                        }
                    })
                })
                console.log({lineCounter})
                console.log({playerGrids})
                console.log({gameField})
                // Call for switching players
                switchPlayers()
            }
        }
        // Call to check the players results with played grids
        checkGridResults()
    }, [playedGrid])

    useEffect(() => {
        if(isLine && isMiddle) {
            console.log("GAME COMPLETE, user:")
        }
    }, [isMiddle, isLine])

    // Switch players
    const switchPlayers = () => {
        if(player === "userA") {
            setPlayer ("userB")
        } else {
            setPlayer ("userA")
        }
    }

    const handleClick = (user:string, col:string, row:string, id:number, checked:boolean|undefined, line:string|undefined) => {
        if(checked) {
            return
        }
        // Call Save played grids
        savePlayedGrid(user, col, row, id, line)
        // Call Update gameGrid with new game data
        updateGameGrid(id)
    }

    // Save played grids
    const savePlayedGrid = (user:string, col:string, row: string, id: number, line:string|undefined) => {
        // Save played grids in new array that checks the game grid score
        const newPlayed:GameGridInt[] = [...playedGrid, {
            id: id,
            col: col,
            row: row,
            user: user,
            line: line
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
                    <div key={div.id} onClick={() => handleClick(player, div.col, div.row, div.id, div.checked, div.line)} className={`checked ${div.user}`}>{div.col} {div.row}</div>
                ))}
            </div>
            <div>{player}</div>
        </>
    )
    }

export default App
