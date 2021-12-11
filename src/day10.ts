

const ERROR_NONE = "";
const ERROR_UNEXPECTED_END = "\n";

const EOL = "\n";

class ChunkChecker {

    input : string;
    pos : number;
    token : string;

    applyFixes : boolean;
    fixes : string[];

    constructor(input: string, applyFixes=false) {
        this.input = input;
        this.pos = 0;
        this.token = EOL;
        this.fixes = [];
        this.applyFixes = applyFixes;
    }

    nextToken() {
        this.token = EOL;
        if (this.pos < this.input.length) {
            this.token = this.input[this.pos];
            this.pos += 1;
        }
    }
    
    // input => ( chunk ) chunk | eps
    checkChunk() : string {

        if (this.token == EOL) {
            return ERROR_NONE;
        }

        if (["(", "{", "<", "["].includes(this.token)) {
            // input => ( chunk) chunk
            const openingToken = this.token;
            let closingToken = "";
            if (openingToken == "(") {
                closingToken = ")";
            }
            else if (openingToken == "{") {
                closingToken = "}";
            }
            else if (openingToken == "[") {
                closingToken = "]";
            }
            else if (openingToken == "<") {
                closingToken = ">";
            }
            this.nextToken();
            const result = this.checkChunk();
            if (result != ERROR_NONE) {
                return result;
            }          
            if (this.token == closingToken)  {
                // console.log(`Chunk ${openingToken}${this.token} done.`);
                this.nextToken();
                return this.checkChunk();
            }
            else {
                // Missing bracket!
                if (this.applyFixes) {
                    this.nextToken();
                    // Only fix things, if we are at the end of the line!
                    if (this.token == EOL) {
                        this.fixes.push(closingToken);
                        return this.checkChunk();
                    }                    
                }
                return this.token; 
            }
        } else {
            // input => eps
        }
        return ERROR_NONE;
    } 

    check() : string {
        this.nextToken();
        let result = this.checkChunk(); 
        if (result != ERROR_NONE) {
            return result;
        }
        if (this.token != EOL) { 
            // Unexpected remaining tokens ("unmatched" closing brackets)
            return this.token;
        }
        else {
            return ERROR_NONE;
        }
    }
}

function part1(lines : string[]) {
    let score = 0;
    let i = 0;
    for (let s of lines) {
        let checker = new ChunkChecker(s);
        const result = checker.check();
        if (result == ")") {
            score += 3;
        }
        else if (result == "]") {
            score += 57;
        }
        else if (result == "}") {
            score += 1197;
        }
        else if (result == ">") {
            score += 25137;
        }
        i += 1;
    }
    return score;
}

function scoreFixes(fixes : string[]) : number {
    return fixes.reduce( (score, fix) => {
        if (fix == ")") {
            score = score*5 + 1;
        }
        else if (fix == "]") {
            score = score*5 + 2;
        }
        else if (fix == "}") {
            score = score*5 + 3;
        }
        else if (fix == ">") {
            score = score*5 + 4;
        }
        return score;
    }, 0);

}

function part2(lines : string[]) {
    lines = lines.filter(s => s.length > 0) 
    const scores : number[] = [];
    let i = 0;
    for (let s of lines) {
        let checker = new ChunkChecker(s, true);
        const result = checker.check();
        if (result == ERROR_NONE) {
            console.log(`${i}: ${checker.fixes.join('')}`);
            const score = scoreFixes(checker.fixes);
            scores.push(score);
        }
        i += 1;
    }
    scores.sort( (a, b) => a - b );
    const mean = scores[Math.floor(scores.length/2)];
    return mean; // 3490802734
}

export { part1, part2, ChunkChecker, ERROR_NONE, ERROR_UNEXPECTED_END };