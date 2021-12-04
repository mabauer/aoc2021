
class Submarine {

    protected depth: number;
    protected position: number;

    constructor(position: number = 0, depth: number = 0) {
        this.position = position;
        this.depth = depth;
    }

    forward(units: number) {
        this.position += units;
    }

    down(units: number) {
        this.depth += units;
    }

    up(units: number) {
        this.depth -= units;
    }

    getPosition() : number {
        return this.position * this.depth;
    }
}

class Submarine2 extends Submarine {

    protected aim: number;

    constructor(position: number = 0, depth: number = 0, aim = 0) {
        super(position, depth);
        this.aim = aim;
    }

    down(units: number) {
        this.aim += units;
    }

    up(units: number) {
        this.aim -= units;
    }

    forward(units: number) {
        this.position += units;
        this.depth += this.aim * units;
        // console.log(`Submarine: pos=${this.position}, depth=${this.depth}, aim=${this.aim}`);
    }
}

function part1(lines : string[]) {
    let submarine = new Submarine(0, 0);
    for (let line of lines) {
        const [cmd, operand] = line.split(" ");
        const units = parseInt(operand);
        if (cmd == "forward")
            submarine.forward(units);
        if (cmd == "down")
            submarine.down(units);
        if (cmd == "up")
            submarine.up(units);
    }
    return submarine.getPosition();
}

function part2(lines : string[]) {
    let submarine = new Submarine2(0, 0, 0);
    for (let line of lines) {
        const [cmd, operand] = line.split(" ");
        const units = parseInt(operand);
        if (cmd == "forward")
            submarine.forward(units);
        if (cmd == "down")
            submarine.down(units);
        if (cmd == "up")
            submarine.up(units);
    }
    return submarine.getPosition();
}

export { part1, part2 };