function countChars(s: string, ch: string) : number {
    return s.split("")
        .map( (elem, i) => {
            if (elem === ch) return i
        })
        .filter(elem => elem != null)
        .length
    
}

function part1(lines : string[]) {
    lines = lines.filter(l => l.length > 0);
    let gamma : string = "";
    let epsilon : string = ""; 
    const len = lines[0].length;
    for (let i = 0; i < len; i++) {
        let col = "";
        for (let line of lines) {
            col += line[i];
        }
        // console.log(col);
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

enum STRATEGY {
    MOST_COMMON,
    LEAST_COMMON,
}

function compute_rating(lines : string[], strategy=STRATEGY.MOST_COMMON) {
    let remaining = lines.filter(l => l.length > 0);
    const len = remaining[0].length;
    for (let i = 0; i < len; i++) {
        let col = "";
        for (let line of remaining) {
            col += line[i];
        }
        // console.log(col);
        const zeros : number[] = col.split("")
            .map( (elem, i) => (elem === "0")? i :  -1 )
            .filter(elem => (elem >= 0));
        const ones : number[] = col.split("")
            .map( (elem, i) => (elem === "1")? i :  -1 )
            .filter(elem => (elem >= 0));
        // console.log(`ones: ${ones.length}`);
        // console.log(`zeros: ${zeros.length}`);
        const temp = []
        if (strategy == STRATEGY.MOST_COMMON) {
            if (ones.length >= zeros.length) {
                // keep ones
                for (let one of ones) {
                    temp.push(remaining[one]);
                }
            }
            else {
                // keep zeros
                for (let zero of zeros) {
                    temp.push(remaining[zero]);
                }
            }
        } else {
            if (ones.length >= zeros.length) {
                // keep zeros
                for (let zero of zeros) {
                    temp.push(remaining[zero]);
                }
            } else {
                // keep ones
                for (let one of ones) {
                    temp.push(remaining[one]);
                }       
            }
        }
        remaining = temp;
        // console.log(remaining);
        if (remaining.length == 1)
            break;
    }
    const rate = parseInt(remaining[0], 2);
    return rate;
}

function part2(lines : string[]) {
    const o2_generator_rate = compute_rating(lines, STRATEGY.MOST_COMMON);
    const co2_scrubber_rate = compute_rating(lines, STRATEGY.LEAST_COMMON);
    return o2_generator_rate * co2_scrubber_rate;
}

export { countChars, part1, part2 };