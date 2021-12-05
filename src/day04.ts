class Board {

    private cells: number[][];

    constructor(rows: number[][]) {
        this.cells = rows;
    }

    getxy(x: number, y: number) : number {
        return this.cells[y][x];
    }

    winningSequence(numbers_drawn : Set<number>) {
        const size = this.cells.length
        let result = [];
        for (let y = 0; y < size; y++) {
            result = [];
            for (let x = 0; x < size; x++) {
                const value = this.getxy(x, y)
                if (numbers_drawn.has(value)) {
                    result.push(value);
                }
                else {
                    result = [];
                    break;
                } 
            }
            if (result.length > 0)
                return result;
        }
        for (let x = 0; x < size; x++) {
            result = [];
            for (let y = 0; y < size; y++) {
                const value = this.getxy(x, y)
                if (numbers_drawn.has(value)) {
                    result.push(value);
                }
                else {
                    result = [];
                    break;
                } 
            }
            if (result.length > 0)
                return result;
        } 
        return [];
    }
    score(numbers_drawn : Set<number>) : number {
        const size = this.cells.length
        let sum = 0;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const value = this.getxy(x, y)
                if (!numbers_drawn.has(value))
                    sum += value;
            }
        }
        return sum; 
    }
}

function createBoards(lines: string[]) {
    const boards : Board[] = [];
    let rows = [];
    for (let s of lines) {
        if (s && s.length > 0) {
            const row = s.trim().split(/\s+/).map(s => parseInt(s));
            rows.push(row);
        }
        else {
            console.log(rows);
            boards.push(new Board(rows));
            rows = [];
        }
    }
    return boards;
}

function play(boards: Board[], numbers_to_draw: number[]) : number {
    const numbers_drawn = new Set<number>();
    for (let num of numbers_to_draw) {
        numbers_drawn.add(num);
        for (let board of boards) {
            const winning_numbers : number[] = board.winningSequence(numbers_drawn);
            if (winning_numbers && winning_numbers.length > 0) {
                return num * board.score(numbers_drawn);
            }
        }
    }
    return 0;
}

function part1(lines : string[]) {
    const [fst, ...rest] = lines;
    const numbers_to_draw = fst.split(",").map(s => parseInt(s));
    const boards = createBoards(rest);
    const result = play(boards, numbers_to_draw);
    return result;
}

function part2(lines : string[]) {
    let result = 0;
    return result;
}

export { part1, part2, Board, play };