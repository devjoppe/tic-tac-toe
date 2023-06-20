import {GameGridInt, PlayedGridInt} from "../interfaces/GameInt.ts";

export const playedGridCheck = (playedGrid:PlayedGridInt[], gameGrid:GameGridInt[], gridId:number, player:number) => {
    // Construct a counter to check when someone has won!
    const filterGrid:GameGridInt[] = gameGrid.filter(grid => grid.user == player)

    console.log("FILTERED GRID: ", filterGrid)

    // Start with an empty array:

    filterGrid.forEach(grid => {
        playedGrid.map(played => {
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
    return playedGrid
}

export const checkResult = (playedGrid:PlayedGridInt[]) => {
    console.log("checkResult")
    let res = false
    let checkMiddle = false
    playedGrid.forEach(item => {
        if(item.times === 3) {
            console.log("Win!!")
            res = true
        }
        if(item.grid === 'MIDDLE' && item.times === 1) {
            checkMiddle = true
        }
        const checkLine:string[] = ['LEFT', 'RIGHT']
        checkLine.forEach(line => {
            if(line === item.grid && item.lines === 2 && checkMiddle) {
                console.log("Win!! LINES")
                res = true
            }
        })
    })
    return res
}