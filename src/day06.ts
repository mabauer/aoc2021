
const MAX_AGE = 8;

class Swarm {

    // Store the number of fishes in each "age"/cycle
    fishes_per_cycle : number[];

    constructor(fishes : number[]) {
        this.fishes_per_cycle = Array<number>(MAX_AGE+1).fill(0);
        for (let fish of fishes) {
            this.fishes_per_cycle[fish] += 1;
        }
    }

    nextGeneration() {
        const tmp = this.fishes_per_cycle[0];
        for (let i = 0; i < MAX_AGE; i++) {
            this.fishes_per_cycle[i] = this.fishes_per_cycle[i+1];
        }   
        this.fishes_per_cycle[MAX_AGE] = tmp;
        this.fishes_per_cycle[6] += tmp;
    }

    play(n : number) {
        console.log(`Start: ${this.fishes_per_cycle}`);
        for (let i = 1; i <= n; i++) {
            this.nextGeneration();
            console.log(`${i}: ${this.fishes_per_cycle}`);
        }
    }

    getNumberOfFishes() : number {
        let sum = this.fishes_per_cycle.reduce( (sum, n) => sum + n, 0);
        return sum;
    }
}

function part1(lines : string[]) {
    const fishes = lines[0].trim().split(/\s*,\s*/).map(s => parseInt(s));
    const swarm = new Swarm(fishes);
    swarm.play(80);
    let result = swarm.getNumberOfFishes();
    return result;
}

function part2(lines : string[]) {
    const fishes = lines[0].trim().split(/\s*,\s*/).map(s => parseInt(s));
    const swarm = new Swarm(fishes);
    swarm.play(256);
    let result = swarm.getNumberOfFishes();
    return result;
}

export { part1, part2, Swarm };