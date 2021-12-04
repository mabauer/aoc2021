
export function integers(inputs: string[]) : number[] {
    let result = inputs.map(s => parseInt(s));
    return result
}
