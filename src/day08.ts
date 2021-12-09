

const seven_segments = [
    "abcefg",  // 0
    "cf",      // 1
    "acdeg",   // 2
    "acdfg",   // 3
    "bcdf",    // 4
    "abdfg",   // 5
    "abdefg",  // 6
    "acf",     // 7
    "abcdefg", // 8
    "abcdfg",  // 9
];

function parse_line(line : string) : [string[], string[]] {
    const [signal_values, output_values] = line.split("|");
    console.log(signal_values, output_values);
    const signals = signal_values.trim().split(/\s+/);
    const outputs = output_values.trim().split(/\s+/);
    return [signals, outputs];
}

function part1(lines : string[]) {
    let count = 0;
    for (let line of lines) {
        if (line.length > 0) {
            const [signals, outputs] = parse_line(line);
            for (let digit of outputs) {
                const len = digit.length;
                if ([ 2, 4, 3, 7 ].includes(len)) {
                    count += 1;
                } 
            }
        }
    }
    return count;
}

interface Mapping {
    [key: string] : string[];
}

function updateMapping(mapping: Mapping, digit: number, signal: string) {
    const unused_segments = Object.keys(mapping).filter(ch => !signal.includes(ch));
    for (let s of unused_segments) {
        mapping[s] = mapping[s].filter(ch => !seven_segments[digit].includes(ch));
    }
    for (let s of signal) {
        mapping[s] = mapping[s].filter(ch => seven_segments[digit].includes(ch));
    }
}


function find_mapping(signals : string[], pos = 0, digits : number[] = []) : any {
    if (pos == 10) {
        // Build an check mapping
        const mapping : Mapping = {};
        for (let ch of "abcdefg") {
            mapping[ch] = "abcdefg".split('');
        }
        for (let i = 0; i < 10; i++) {
            updateMapping(mapping, digits[i], signals[i]); 
        }
        if (Object.keys(mapping).filter(k => mapping[k].length != 1).length == 0) {
            return mapping;
        }
        else {
           return null; 
        }
    }
    else {
        const signal = signals[pos];
        let new_digits = [...digits];
        if (signal.length == 2) {
            new_digits.push(1);
            return find_mapping(signals, pos+1, new_digits);
        }
        if (signal.length == 3) {
            new_digits.push(7);
            return find_mapping(signals, pos+1, new_digits);
        }
        if (signal.length == 4) {
            new_digits.push(4);
            return find_mapping(signals, pos+1, new_digits);
        }
        if (signal.length == 7) {
            new_digits.push(8);
            return find_mapping(signals, pos+1, new_digits);
        }
        if (signal.length == 5) {
            for (let digit of [2, 3, 5].filter(d => !digits.includes(d))) {
                new_digits.push(digit);
                const tmp = find_mapping(signals, pos + 1, new_digits);
                if (tmp != null) { 
                    return tmp; 
                }
                else {
                    new_digits = [...digits];
                }
            }
        }
        if (signal.length == 6) {
            for (let digit of [0, 6, 9].filter(d => !digits.includes(d))) {
                new_digits.push(digit);
                const tmp = find_mapping(signals, pos + 1, new_digits);
                if (tmp != null) { 
                    return tmp; 
                }
                else {
                    new_digits = [...digits];
                }
            }
        }
    }
}

function convert_output(input: string, mapping: Mapping) : number {
    const segments = input.split('')
        .map((ch: string) => mapping[ch][0])
        .sort()
        .join('');
    // console.log(segments);
    const digit = seven_segments.indexOf(segments);
    return digit;
}

function part2(lines : string[]) {
    let sum = 0;
    for (let line of lines) {
        if (line.length > 0) {
            const [signals, outputs] = parse_line(line);
            const mapping = find_mapping(signals);
            const digits = outputs.map(o => convert_output(o, mapping))
            const output = parseInt(digits.join(''));
            sum += output;
        }
    }
    return sum;
}

export { part1, part2, find_mapping, convert_output };