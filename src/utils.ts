
export function sum(values: number[]) : number {
    const result = values.reduce( (sum, value) => sum + value, 0);
    return result;
}

export function listPlus<T>(l : T[], ...values : T[]) : T[] {
    const result : T[] = [...l];
    result.push(...values);
    return result; 
}

export function listMinus<T>(l : T[], ...values : T[]) : T[] {
    const result = l.filter( (e: any) => ![...values].includes(e));
    return result;
}

export function hashCode(s: string) : number {
    const prime = 31;
    if (s.length == 0) {
        return 0;
    }
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = prime * hash + s.charCodeAt(i);
    }
    return hash;
}
// Fixed (found when porting to tinyscript): the hash code is a string that identifies the object
// uniquely; listIncludes and listIntersect compare only hash codes, so a number that is not
// unique (like 31 * (31*7 + x) + y) made different points equal.
export interface Hashable {
    readonly hashCode: string;
}

export function listIncludes<T extends Hashable>(l: T[], value: T) : boolean {
    return (l.filter(o => value.hashCode == o.hashCode).length > 0);
}

// Changed (found when porting to tinyscript): a Set of the hash codes instead of comparing
// each element of l1 with each of l2. The result is the same, but day 19 does not get
// slower with the string hash codes (it is about four times faster than before).
export function listIntersect <T extends Hashable> (l1: T[], l2: T[]): T[] {
    const hashCodes = new Set(l2.map(o => o.hashCode));
    const result = l1.filter(elem => hashCodes.has(elem.hashCode));
    return result;
}

// Find a perfect matching for between two candidate sets defined by a map
// The first candidate set makes up the keys, the second candidate set makes up the values of the map.
// Example: For {'nhx': {'fish'}, 'rrjb': {'peanuts'}, 'xmhsbd': {'wheat', 'peanuts', 'fish'}} a matching is:
//    {'nhx': 'fish', 'rrjb': 'peanuts', 'xmhsbd': 'wheat'}
interface Matching {
    [key: string] : string[];
}

export function findMatching(candidates: Matching, done : string[] = [], keys_to_process : string[] = []) : Matching | null {
    if (candidates == null) {
        return null;
    }
    if (keys_to_process.length == 0) {
        // TODO: Check if candidates object is built properly
        keys_to_process = Object.keys(candidates).sort( (a, b) => candidates[a].length - candidates[b].length );
    }
    let solution = { ...candidates };
    while (keys_to_process.length > 0) {
        const key = keys_to_process[0];
        const values = candidates[key].filter((o: any) => !done.includes(o));
        if (values.length == 0) {
            return null;
        }
        if (values.length == 1) {
            solution[key] = [values[0]];
            done.push(values[0]);
            keys_to_process = listMinus(keys_to_process, key);
            // console.log(`1: ${key}: ${values[0]} (${done} | ${keys_to_process})`);
        }
        else {
            for (let elem of values) {
                const temp = findMatching(solution, listPlus(done, elem), listMinus(keys_to_process, key)); 
                if (temp != null) {
                    solution = temp;
                    solution[key] = [elem];
                    keys_to_process = listMinus(keys_to_process, key);
                    // console.log(`2: ${key}: ${elem} (${done} | ${keys_to_process})`);
                    return solution;
                }                
            }
            return null;
        }
    }
    return solution;
} 

export function integers(inputs: string[]) : number[] {
    let result = inputs.map(s => parseInt(s));
    return result
}

export function stripEmptyLines(lines: string[]) {
    return lines.filter(s => s.length > 0);
}
