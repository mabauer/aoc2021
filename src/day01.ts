#!/usr/bin/env ts-node

import { read_inputfile, integers } from './utils'

function part1(lines : string[]) {
    let ints = integers(lines);
    var result = 0;
    for (let pos = 1; pos <= ints.length; pos++) {
        if (ints[pos-1] < ints[pos])
            result += 1;
    }
    return result;
}

declare global {
    interface Array<T> {
        reduce_pairs<U>( reducerFunction: (result: U, prev: T, current: T) => U, initialValue : U) : U ;
    }
}
  
if (!Array.prototype.reduce_pairs) {
    Array.prototype.reduce_pairs = function<T, U>(this: T[], 
            reducerFunction: (result: U, prev: T, current: T) => U, initialValue : U) : U {
        if (this.length < 2)
            return initialValue;
        let result = initialValue;
        let prev = this[0];
        let pos = 1;
        while (pos < this.length) {
            let current = this[pos];
            result = reducerFunction(result, prev, current);
            pos = pos + 1;
            prev = current;
        } 
        return result;
    }
}


function part1b(lines : string[]) {
    let ints = integers(lines);
    return ints.reduce_pairs((result, prev, current) => {
        if (prev < current)
            result += 1;
        return result;
    }, 0)
}

function part2(lines : string[]) {
    let ints = integers(lines)
    let result = 0;
    // Comparing the measurements with sliding windows can be reduced to 
    // comparing the 1st element of the "previous" windows with the 3rd element of the current window!
    for (var pos = 3; pos <= ints.length; pos++) {
        if (ints[pos-3] < ints[pos])
            result += 1;
    }
    return result;
}

async function main() {
    const lines = await read_inputfile("input01.txt")
    const result1 = part1(lines);
    console.log(`The answer for part one is: ${result1}`)  
    const result2 = part2(lines);
    console.log(`The answer for part two is: ${result2}`)  
}

main();

export { part1, part2, part1b };