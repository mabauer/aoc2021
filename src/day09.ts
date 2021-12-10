import { sum, list_includes } from './utils'

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
}

class HeightMap {

    dimX: number;
    dimY : number;
    cells : number[][] = [];

    constructor(rows: number[][]) {
        this.dimX = rows[0].length;
        this.dimY = rows.length;
        for (let y = 0; y < this.dimY; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.dimX; x++) {
                this.cells[y][x] = rows[y][x];
            }
        }
    }

    getxy(x: number, y: number) : number {
        return this.cells[y][x];
    }

    setxy(x: number, y: number, value: number) {
        this.cells[y][x] = value;
    }

    getNeighbours(x: number, y: number) : number[] {
        const neighbours = [];
        if (x-1 >= 0) {
            neighbours.push(this.getxy(x-1, y));
        } 
        if (x+1 < this.dimX) {
            neighbours.push(this.getxy(x+1, y));
        }
        if (y-1 >= 0) {
            neighbours.push(this.getxy(x, y-1));
        }
        if (y+1 < this.dimY) {
            neighbours.push(this.getxy(x, y+1));
        }
        return neighbours;
    }

    findLows() : number[] {
        let result = [];
        for (let y = 0; y < this.dimY; y++) {
            for (let x = 0; x < this.dimX; x++) {
                const value = this.getxy(x, y)
                if (this.getNeighbours(x, y).filter(n => n <= value).length == 0)
                    result.push(value)
            }
        } 
        return result;
    }

    expandBasin(x : number, y : number, basin : Point[] = []) : number {
        const coords = new Point(x, y);
        if (list_includes(basin, coords, (p, q) => (p.equals(q))))
            return 0;
        basin.push(coords);
        let size = 1;
        const value = this.getxy(x, y);
        if ((x-1 >= 0) && (this.getxy(x-1, y) > value) && this.getxy(x-1, y) < 9) {
            size += this.expandBasin(x-1, y, basin);
        } 
        if ((x+1 < this.dimX) && (this.getxy(x+1, y) > value) && this.getxy(x+1, y) < 9) {
            size += this.expandBasin(x+1, y, basin);
        }
        if ((y-1 >= 0) && (this.getxy(x, y-1) > value) && this.getxy(x, y-1) < 9) {
            size += this.expandBasin(x, y-1, basin);
        }
        if ((y+1 < this.dimY) && (this.getxy(x, y+1) > value) && this.getxy(x, y+1) < 9){
            size += this.expandBasin(x, y+1, basin);
        }
        return size;
    }

    findBasins() : number[] {
        let result = [];
        for (let y = 0; y < this.dimY; y++) {
            for (let x = 0; x < this.dimX; x++) {
                const value = this.getxy(x, y)
                if (this.getNeighbours(x, y).filter(n => n <= value).length == 0) {
                    const size = this.expandBasin(x, y);
                    console.log(`Basin around (${x}, ${y}): ${size}`);
                    result.push(size);
                }
            }
        } 
        return result;
    }
}

function part1(lines : string[]) {
    const map = new HeightMap(lines.filter(s => s.length > 0)
        .map(r => r.split('').map(c => parseInt(c))));
    const lows = map.findLows();
    console.log(lows);
    const risks = lows.map(n => n +1)
    let result = sum(risks);
    return result;
}

function part2(lines : string[]) {
    const map = new HeightMap(lines.filter(s => s.length > 0)
    .map(r => r.split('').map(c => parseInt(c))));
    const basins = map.findBasins();
    console.log(basins);
    basins.sort((a, b) => b -a);
    if (basins.length >= 3) {
        return basins[0] * basins[1] * basins[2];
    }
    else {
        return 0;
    }
}

export { part1, part2 };