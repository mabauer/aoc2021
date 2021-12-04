function countChars(s: string, ch: string) : number {
    return s.split("")
        .map( (elem, i) => {
            if (elem === ch) return i
        })
        .filter(elem => elem != null)
        .length
    
}

function part1(lines : string[]) {
    let gamma : string = "";
    let epsilon : string = ""; 
    const len = lines[0].length;
    for (let i = 0; i < len; i++) {
        let col = "";
        for (let line of lines) {
            col += line[i];
        }
        console.log(col);
        const zeros = countChars(col, "0");
        const ones = countChars(col, "1");
        if (ones > zeros) {
            gamma = gamma + "1";
            epsilon = epsilon + "0";
        }
        else {
            gamma = gamma + "0";
            epsilon = epsilon + "1";
        }
    }
    const gamma_rate = parseInt(gamma, 2);
    const epsilon_rate = parseInt(epsilon, 2);
    const result = gamma_rate * epsilon_rate;

    return result;
}

function part2(lines : string[]) {
    let result = 0;
    return result;
}

export { countChars, part1, part2 };