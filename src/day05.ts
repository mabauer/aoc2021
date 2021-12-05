
class Coordinates {
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

    drawLine(line: Coordinates[]) {
        const origin = line[0];
        const dest = line[1];
        if (origin.x == dest.x) {
            const x = origin.x;
            const dy = (origin.y > dest.y)? -1 : 1;
            let y = origin.y;
            while (y != dest.y) {
                this.setxy(x, y, this.getxy(x, y) + 1);
                y += dy;
            }
            this.setxy(x, dest.y, this.getxy(x, dest.y) + 1);

        }
        if (origin.y == dest.y) {
            const y = origin.y;
            const dx = (origin.x > dest.x)? -1 : 1;
            let x = origin.x;
            while (x != dest.x) {
                this.setxy(x, y, this.getxy(x, y) + 1);
                x += dx;
            }
            this.setxy(dest.x, y, this.getxy(dest.x, y) + 1);
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

function parseLine(s : string) : Coordinates[] {
    const re = /(\d+),(\d+)\s*\-\>\s*(\d+),(\d+)/;
    const matches = re.exec(s);
    if (matches && matches.length == 5) {
        const values = matches.map(s => parseInt(s));
        const result = [ new Coordinates(values[1], values[2]), new Coordinates(values[3], values[4])];
        // console.log(result);
        return result;
    }
    return [];
}

function part1(lines : string[]) {
    lines = lines.filter(l => l.length > 0);
    const seamap = new Canvas(1000, 1000);
    for (let s of lines) {
        const line: Coordinates[] = parseLine(s);
        if (line && line.length == 2)
            seamap.drawLine(line);
    }
    // console.log(seamap.toString());
    const result = seamap.countCells(value => value >= 2);
    return result;
}

function part2(lines : string[]) {
    return 0;
}

export { part1, part2 };