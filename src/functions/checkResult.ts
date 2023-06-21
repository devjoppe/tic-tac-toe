import {GameGridInt, PlayedGridInt} from "../interfaces/GameInt.ts";
import playedGridData from '../assets/data/checkGrid.json'

export const playedGridCheck = (gameGrid:GameGridInt[], player:number) => {
    // Construct a counter to check when someone has won!
    const filterGrid:GameGridInt[] = gameGrid.filter(grid => grid.user == player)
    const newPlayedGrid:PlayedGridInt[] = JSON.parse(JSON.stringify(playedGridData))

    filterGrid.forEach(grid => {
        newPlayedGrid.map(played => {
            if(grid && played.grid === grid.col || grid && played.grid === grid.row || grid && played.grid === grid.line) {
                played.times +=1
                played.user = player
                if(grid.line === "LEFT" || grid.line === "RIGHT" || grid.line === "MIDDLE") {
                    played.lines += 1
                    played.user = player
                }
            }
        })
    })
    return newPlayedGrid
}

export const checkResult = (playedGrid:PlayedGridInt[]) => {
    console.log("checkResult")
    let res = false
    let checkMiddle = false
    playedGrid.forEach(item => {
        if(item.times === 3) {
            console.log("Win - Hor - Ver")
            res = true
        }
        if(item.grid === 'MIDDLE' && item.times === 1) {
            checkMiddle = true
            console.log("MIDDLE:", checkMiddle)
        }
    })
    const checkLine: string[] = ['LEFT', 'RIGHT'];
    checkLine.forEach(line => {
        if (playedGrid.some(item => item.grid === line && item.lines === 2 && checkMiddle)) {
            console.log("Win - Lines")
            res = true;
        }
    });
    return res
}