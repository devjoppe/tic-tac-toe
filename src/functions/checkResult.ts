import {GameGridInt, PlayedGridInt} from "../interfaces/GameInt.ts";

export const playedGridCheck = (playedGrid:PlayedGridInt[], gameGrid:GameGridInt[], gridId:number, player:number) => {
    // Construct a counter to check when someone has won!
    const filterGrid:GameGridInt[] = gameGrid.filter(grid => grid.id == gridId)

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

export const checkResult = () => {
    console.log("checkResult")
}