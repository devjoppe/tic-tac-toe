import {GameGridInt} from "../interfaces/GameInt.ts";
import arrayShuffle from "array-shuffle";

export const cpuTurn = (gameGrid:GameGridInt[]) => {
    const calcGrid:number[] = []
    gameGrid.map(grid => {
        if(!grid.checked) {
            calcGrid.push(grid.id)
        }
    })
    const shuffledGrid = arrayShuffle(calcGrid)
    return shuffledGrid[0]
}