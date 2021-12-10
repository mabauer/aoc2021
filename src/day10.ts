

const ERROR_NONE = "";
const ERROR_UNEXPECTED_END = "\n";

const EOL = "\n";

class ChunkParser {

    input : string;
    pos : number;
    token : string;

    constructor(input: string) {
        this.input = input;
        this.pos = 0;
        this.token = EOL;
    }

    nextToken() {
        this.token = EOL;
        if (this.pos < this.input.length) {
            this.token = this.input[this.pos];
            this.pos += 1;
        }
    }
    
    // inout => ( chunk ) chunk | eps
    parseChunk() : string {

        if (this.token == EOL) {
            return ERROR_NONE;
        }
        if (["(", "{", "<", "["].includes(this.token)) {
            const openingToken = this.token;
            this.nextToken();
            const result = this.parseChunk();
            if (result != ERROR_NONE) {
                return result;
            }          
            if ((openingToken == "(" && this.token == ")")
                    || (openingToken == "{" && this.token == "}")
                    || (openingToken == "[" && this.token == "]")
                    || (openingToken == "<" && this.token == ">") ) {
                console.log(`Chunk ${openingToken}${this.token} done.`);
                this.nextToken();
                return this.parseChunk();
            }
            else {
                // Missing bracket!
                return this.token; 
            }
        } else {
        }
        return ERROR_NONE;
    } 

    parse() : string {
        this.nextToken();
        let result = this.parseChunk(); 
        if (result != ERROR_NONE) {
            return result;
        }
        if (this.token != EOL) { 
            // Unexpected opening closing brackets
            return this.token;
        }
        else {
            return ERROR_NONE;
        }
    }
}

function part1(lines : string[]) {
    let score = 0;
    for (let s of lines) {
        let parser = new ChunkParser(s);
        const result = parser.parse();
        if (result == ")") {
            score += 3;
        }
        if (result == "]") {
            score += 57;
        }
        if (result == "}") {
            score += 1197;
        }
        if (result == ">") {
            score += 25137;
        }
    }
    return score;
}

function part2(lines : string[]) {
    // let ints = integers(lines)
    let result = 0;
    return result;
}

export { part1, part2, ChunkParser, ERROR_NONE, ERROR_UNEXPECTED_END };