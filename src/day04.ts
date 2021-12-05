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
            // console.log(rows);
            boards.push(new Board(rows));
            rows = [];
        }
    }
    return boards;
}

function play_part1(boards: Board[], numbers_to_draw: number[]) : number {
    const numbers_drawn = new Set<number>();
    for (let num of numbers_to_draw) {
        numbers_drawn.add(num);
        for (let board of boards) {
            const winning_sequence : number[] = board.winningSequence(numbers_drawn);
            if (winning_sequence && winning_sequence.length > 0) {
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
    const result = play_part1(boards, numbers_to_draw);
    return result;
}

function play_part2(boards: Board[], numbers_to_draw: number[]) : number {
    let remaining_boards = [...boards];
    let winning_boards : Board[] = [];
    let last_winning_round = 0;
    for (let round = 0; round < numbers_to_draw.length; round++) {
        for (let board of remaining_boards) {
            const winning_squence : number[] = board.winningSequence(new Set(numbers_to_draw.slice(0, round+1)));
            if (winning_squence && winning_squence.length > 0) {
                last_winning_round = round;
                winning_boards.push(board);
            }
        }
        // console.log(`${numbers_to_draw[round]} drawn: ${remaining_boards.length}`);
        remaining_boards = remaining_boards.filter(b => !winning_boards.includes(b));
        if (remaining_boards.length == 0)
            break;
    }
    const last_board = winning_boards[winning_boards.length-1];
    const last_winning_number = numbers_to_draw[last_winning_round]
    // console.log(last_winning_number);
    // console.log(last_board);
    return last_winning_number * last_board.score(new Set(numbers_to_draw.slice(0, last_winning_round+1)));
}

function part2(lines : string[]) {
    const [fst, ...rest] = lines;
    const numbers_to_draw = fst.split(",").map(s => parseInt(s));
    const boards = createBoards(rest);
    const result = play_part2(boards, numbers_to_draw);
    return result;
}

export { part1, part2, Board, play_part1, play_part2 };