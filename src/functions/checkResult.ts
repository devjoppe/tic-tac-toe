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
    let res = false
    let checkMiddle = false
    playedGrid.forEach(item => {
        if(item.times === 3) {
            res = true
        }
        if(item.grid === 'MIDDLE' && item.times === 1) {
            checkMiddle = true
        }
    })
    const checkLine: string[] = ['LEFT', 'RIGHT'];
    checkLine.forEach(line => {
        if (playedGrid.some(item => item.grid === line && item.lines === 2 && checkMiddle)) {
            res = true;
        }
    });
    return res
}

// Check cross lines
export const checkLines = (storePlayedGrid:PlayedGridInt[]) => {
    // Check the horizontal and vertical lines
    const checkHorVer = storePlayedGrid.filter(item => item.times === 3)
    if(checkHorVer[0]) {
        return checkHorVer[0].grid
    }

    // Check the corners and middle to form the X-line.
    const checkXLines = storePlayedGrid
        .filter(item =>
            (item.grid === "LEFT" || item.grid ===  "RIGHT") && item.times === 2)
    const checkMiddle = storePlayedGrid.filter(item => item.grid === "MIDDLE" && item.times === 1)
    if(checkXLines[0] && checkMiddle[0]) {
        return checkXLines[0].grid
    }
    return ""
}