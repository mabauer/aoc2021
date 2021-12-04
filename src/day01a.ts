#!/usr/bin/env ts-node

import { integers } from './utils'

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

export { part1 };