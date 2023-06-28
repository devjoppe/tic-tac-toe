import {GameGridInt} from "../interfaces/GameInt.ts";

export const checkPlayedGrid = (gameGrid:GameGridInt[], gridId:number, player:number) => {
    // update gameGrid with checked "true" on id
    return gameGrid.map(grid => {
        if(grid.id === gridId) {
            grid.checked = true
            grid.user = player
        }
        return grid
    })
}