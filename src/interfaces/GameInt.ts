export interface GameGridInt {
    id: number,
    col: string,
    row: string,
    line: string
    checked: boolean,
    user: number,
}

export interface CheckGameGridInt {
    grid: string,
    line: string,
    times: number,
    lines: number,
    user: number
}