import { listIncludes } from './utils'

class Point {

    x : number;
    y : number;

    constructor(x: number, y: number) {
        this.x = x; 
        this.y = y;
    }

    equals(other: Point) : boolean {
        return (other && this.x == other.x && this.y == other.y);
    }

    get hashCode() : number {
        return 31 * (31*7 + this.x) + this.y;

    }
}

function parseDots(lines: string[]) : Point[] {
    const dots = [];
    for (let s of lines) {
        const match = s.match(/(\d+)\s*,\s*(\d+)/);
        if (match) {
            const dot = new Point(parseInt(match[1]), parseInt(match[2]));
            dots.push(dot);
        }
    }
    return dots;
}

function foldDots(axis: string, pos: number, dots: Point[]) {
    console.log(`folding along ${axis}=${pos}`);
    const copy = [...dots];
    for (let dot of copy) {
        const foldedDot = new Point(dot.x, dot.y)
        if ((axis == "x") && (dot.x > pos)) {
            foldedDot.x = pos - (foldedDot.x - pos);
            if (!listIncludes(dots, foldedDot)) {
                dots.push(foldedDot);
            }
            dots.splice(dots.indexOf(dot), 1);
        }
        if ((axis == "y") && (dot.y > pos)) {
            foldedDot.y = pos - (foldedDot.y - pos);
            if (!listIncludes(dots, foldedDot)) {
                dots.push(foldedDot);
            }
            dots.splice(dots.indexOf(dot), 1);
        }
        // console.log(dots);
    }
}

function part1(lines : string[]) {
    let dots = parseDots(lines);
    console.log(dots.length);
    for (let s of lines) {
        const match = s.match(/fold along ([xy])=(\d+)/);
        if (match) {
            const pos = parseInt(match[2]);
            const axis = match[1];
            foldDots(axis, pos, dots);
            break;
        }
    }
    const result = dots.length;
    return result;
}

function display(dots: Point[]) {
    const dimX = Math.max(...dots.map(d => d.x)) + 1;
    const dimY = Math.max(...dots.map(d => d.y)) + 1;
    const rows: string[][] = [];
    for (let y = 0; y < dimY; y++) {
        let row = [];
        for (let x = 0; x < dimX; x++) {
            row.push(" ");
        }
        rows.push(row);
    }
    for (let dot of dots) {
        rows[dot.y][dot.x] = "#";
    }
    console.log(rows.map(row => row.join('')).join("\n"));
}

function part2(lines : string[]) {
    let dots = parseDots(lines);
    console.log(dots.length);
    for (let s of lines) {
        const match = s.match(/fold along ([xy])=(\d+)/);
        if (match) {
            const pos = parseInt(match[2]);
            const axis = match[1];
            foldDots(axis, pos, dots);
        }
    }
    display(dots);
    return "See above";
}

export { part1, part2, parseDots, foldDots, display };