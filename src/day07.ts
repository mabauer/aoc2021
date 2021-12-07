// import { integers } from './utils'

function sum(...values : number[]) : number {
    return values.reduce( (sum, current) => sum + current, 0);
}

function optimizeMoves(crabs: number[], costFunction: (n: number) => number) : number {
    let best = Number.MAX_VALUE;

    const min = Math.min(...crabs); // crabs.reduce( (min, n) => (n < min)? n : min, Number.MAX_VALUE );
    const max = Math.max(...crabs);

    for (let pos = min; pos <= max; pos++) {
        const moves = crabs.map( c => Math.abs(c - pos) );
        const costs = moves.map( m => costFunction(m));
        const cost = sum(...costs);
        if (cost < best) {
            best = cost;
        }
    }
    return best;
}

function part1(lines : string[]) {
    const crabs = lines[0].trim().split(/\s*,\s*/).map(s=>parseInt(s));
    const linearCostFunction = (n: number) => n;
    let result = optimizeMoves(crabs, linearCostFunction);
    return result;
}

function part2(lines : string[]) {
    const crabs = lines[0].trim().split(/\s*,\s*/).map(s=>parseInt(s));
    const triangularCostFunction = (n: number) => (n * (n + 1)) / 2;
    let result = optimizeMoves(crabs, triangularCostFunction);
    return result;
}

export { part1, part2 };