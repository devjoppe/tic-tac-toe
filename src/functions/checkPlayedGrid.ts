import {GameGridInt} from "../interfaces/GameInt.ts";

export const checkPlayedGrid = (gameGrid:GameGridInt[], gridId:number, player:number) => {
    // Check if already used
    const isUsed = gameGrid.filter(item => item.id === gridId && item.checked)
    if(isUsed[0]) {
        return
    }
    // update gameGrid with checked "true" on id
    return gameGrid.map(grid => {
        if(grid.id === gridId) {
            grid.checked = true
            grid.user = player
        }
        return grid
    })

}