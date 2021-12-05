const CANVAS_SIZE = 1000;
class Point {
    x : number;
    y : number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class Canvas {

    private cells: number[][];
    private x_max: number;
    private y_max: number;

    constructor(x_max: number, y_max: number) {
        this.x_max = x_max;
        this.y_max = y_max;
        this.cells = [];
        for (let y = 0; y < y_max; y ++) {
            const row = [];
            for (let x = 0; x < x_max; x++) {
                row.push(0);
            }
            this.cells.push(row);
        }
    }

    getxy(x: number, y: number) : number {
        return this.cells[y][x];
    }

    setxy(x: number, y:number, value: number) {
        this.cells[y][x] = value;
    }

    drawLine(line: Point[], diagonals=false) {
        const origin = line[0];
        const dest = line[1];
        const deltax = dest.x-origin.x;
        const deltay = dest.y-origin.y;
        let dx = 0;
        let dy = 0;
        if (deltax == 0) {
            dx = 0;
            dy = (deltay > 0)? 1 : -1;
        }
        if (deltay == 0) {
            dx = (deltax > 0)? 1 : -1;;
            dy = 0;
        }
        if (diagonals && (Math.abs(deltax) == Math.abs(deltay))) {
            dx = (deltax > 0)? 1 : -1;
            dy = (deltay > 0)? 1 : -1;
        }
        if (dx != 0 || dy != 0) {
            let x = origin.x;
            let y = origin.y;
            while (x != dest.x || y != dest.y ) {
                this.setxy(x, y, this.getxy(x, y) + 1);
                x += dx;
                y += dy;
            }
            this.setxy(x, y, this.getxy(x, y) + 1);
        }
    }

    toString() {
        let result = "";
        for (let y = 0; y < this.y_max; y ++) {
            let line = "";
            for (let x = 0; x < this.x_max; x++) {
                line += this.getxy(x, y).toString();
            }
            line += "\n";
            result += line;
        }
        return result;
    }

    countCells(condition: (value: number) => Boolean) : number {
        let result = 0;
        for (let y = 0; y < this.y_max; y ++) {
            for (let x = 0; x < this.x_max; x++) {
                if (condition(this.getxy(x, y)))
                    result += 1;
            }
        }  
        return result;
    }
}

function parseLine(s : string) : Point[] {
    const re = /(\d+),(\d+)\s*\-\>\s*(\d+),(\d+)/;
    const matches = re.exec(s);
    if (matches && matches.length == 5) {
        const values = matches.map(s => parseInt(s));
        const result = [ new Point(values[1], values[2]), new Point(values[3], values[4])];
        // console.log(result);
        return result;
    }
    return [];
}

function part1(lines : string[]) {
    lines = lines.filter(l => l.length > 0);
    const seamap = new Canvas(CANVAS_SIZE, CANVAS_SIZE);
    for (let s of lines) {
        const line: Point[] = parseLine(s);
        if (line && line.length == 2)
            seamap.drawLine(line);
    }
    // console.log(seamap.toString());
    const result = seamap.countCells(value => value >= 2);
    return result;
}

function part2(lines : string[]) {
    lines = lines.filter(l => l.length > 0);
    const seamap = new Canvas(CANVAS_SIZE, CANVAS_SIZE);
    for (let s of lines) {
        const line: Point[] = parseLine(s);
        if (line && line.length == 2)
            seamap.drawLine(line, true);
    }
    // console.log(seamap.toString());
    const result = seamap.countCells(value => value >= 2);
    return result;
}

export { part1, part2, parseLine, Point };