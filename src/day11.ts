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

const FLASHING = 10;

class Swarm {

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

    getNeighbours(x: number, y: number) : Point[] {
        const neighbours = [];
        for (let j = y-1; j <= y+1; j++ ) {
            for (let i = x-1; i <= x+1; i++) {
                if ((j >= 0) && (j < this.dimY) 
                        && (i >= 0) && (i < this.dimX ) 
                        && !((i == x) && (j == y))) {
                    neighbours.push(new Point(i, j));
                }
            }
        }
        return neighbours;
    }

    flash (todo: Point[]) {
        while (todo.length > 0) {
            // console.log(this.getRows().join("\n")+"\n");
            // console.log(todo.map(p => `(${p.x},${p.y})`).join(", "));
            const first = todo.pop();
            if (first) {
                const neighbours = this.getNeighbours(first.x, first.y);
                // console.log(`(${first.x}, ${first.y}): ` + neighbours.map(p => `(${p.x},${p.y})`).join(", "));
                for (let n of neighbours) {
                    let level = this.getxy(n.x, n.y);
                    if (level < FLASHING) {
                        level += 1;
                        this.setxy(n.x, n.y, level);
                        if (level == FLASHING && !list_includes(todo, n, (p1, p2) => p1.equals(p2)) ) {
                            todo.push(n);
                        }
                    }
                }   

            }
        }
    } 

    nextGeneration() : number {
        let flashes = 0;
        const todo : Point[] = [];
        for (let y = 0; y < this.dimY; y++) {
            for (let x = 0; x < this.dimX; x++) {
                let level = this.getxy(x, y);
                level += 1;
                this.setxy(x, y, level);
                if (level >= FLASHING) {
                    todo.push(new Point(x, y));
                }
            }
        }
        this.flash(todo);
        for (let y = 0; y < this.dimY; y++) {
            for (let x = 0; x < this.dimX; x++) {
                if (this.getxy(x, y) >= FLASHING) {
                    this.setxy(x, y, 0);
                    flashes += 1;
                }
            }
        }
        return flashes;
    }

    play(n : number, flashes = 0) : number {
        for (let i = 1; i <= n; i++) {
            flashes += this.nextGeneration();
        }
        return flashes;
    }

    getRows() {
        return this.cells.map(row => row.map(v => (v >= FLASHING)? '*' : v.toString()).join(''));
    }

    isSynchronized() : boolean {
        const s = sum(this.cells.map(row => sum(row)));
        console.log(s);
        return  s == 0;
    }

    playUntilSynchronized() : number {
        let i = 0;
        while (!this.isSynchronized()) {
            this.nextGeneration();
            console.log(i);
            i += 1;
        }
        return i;
    }

}

function part1(lines : string[]) {
    const swarm = new Swarm(lines.filter(s => s.length > 0)
        .map(r => r.split('').map(c => parseInt(c))));
    const flashes = swarm.play(100);
    return flashes;
}

function part2(lines : string[]) {
    const swarm = new Swarm(lines.filter(s => s.length > 0)
        .map(r => r.split('').map(c => parseInt(c))));
    const gens = swarm.playUntilSynchronized();
    return gens;
}

export { part1, part2, Swarm };