import fs from 'fs' ;
import path from 'path';

export function integers(inputs: string[]) : number[] {
    let result = []
    for (var s of inputs) {
        result.push(parseInt(s))
    } 
    return result
}

export async function read_inputfile(filename: string) {
    const data = await fs.promises.readFile("." +  path.sep + "input" + path.sep + filename, 'utf8');
    const lines : string[] = data.split("\n");
    return lines;
}