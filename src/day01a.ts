#!/usr/bin/env ts-node

import { read_inputfile, integers } from './utils'

declare global {
    interface Array<T> {
        reduce_pairs<U>( initialValue : U, reducerFunction: (result: U, fst: T, snd: T) => U, ) : U ;
    }
}
  
if (!Array.prototype.reduce_pairs) {
    Array.prototype.reduce_pairs = function<T, U>(this: T[], initialValue : U,
            reducerFunction: (result: U, fst: T, snd: T) => U) : U {
        if (this.length < 2)
            return initialValue;
        else {
            const [fst, ...rest] = this;
            const snd = rest[0];
            const result = reducerFunction(initialValue, fst, snd);
            return rest.reduce_pairs(result, reducerFunction);
        }
    }
}

function part1(lines : string[]) {
    let ints = integers(lines);
    return ints.reduce_pairs(0, (result, fst, snd) => {
        if (fst < snd)
            result += 1;
        return result;
    })
}

async function main() {
    const lines = await read_inputfile("input01.txt")
    const result1 = part1(lines);
    console.log(`The answer for part one is: ${result1}`)  
}

main();

export { part1 };