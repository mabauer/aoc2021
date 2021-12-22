import { sum, listIncludes, stripEmptyLines } from './utils'

class Image {

    dimX: number;
    dimY : number;
    cells : number[][] = [];
    edge : number;

    constructor(rows: number[][]) {
        this.dimX = rows[0].length;
        this.dimY = rows.length;
        for (let y = 0; y < this.dimY; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.dimX; x++) {
                this.cells[y][x] = rows[y][x];
            }
        }
        this.edge = 0;
    }

    getxy(x: number, y: number) : number {
        if ((y >= 0) && (y < this.dimY) 
                && (x >= 0) && (x < this.dimX)) {
            return this.cells[y][x];
        }
        else {
            return this.edge;
        }        
    }

    setxy(x: number, y: number, value: number) {
        this.cells[y][x] = value;
    }

    getBinaryStringForPixel(x: number, y: number) : string {
        const result = [];
        for (let j = y-1; j <= y+1; j++ ) {
            for (let i = x-1; i <= x+1; i++) {
                const value = this.getxy(i, j);
                if ( value > 0) {
                    result.push("1");
                }
                else {
                    result.push("0");
                }
            }
        }
        return result.join("");
    }

    computeEnhancedImage(enhancementString: string) : Image {
        const result = createBlankImage(this.dimX+2, this.dimY+2);

        // Compute new edge
        let binaryString = this.getBinaryStringForPixel(-10, -10);
        let index = parseInt(binaryString, 2);
        let value = (enhancementString[index]=="#")? 1: 0;
        result.edge = value;

        // Compute inner part
        for (let y = 0; y < this.dimY+2; y++) {
            for (let x = 0; x < this.dimY+2; x++) {
                binaryString = this.getBinaryStringForPixel(x-1, y-1);
                index = parseInt(binaryString, 2);
                value = (enhancementString[index]=="#")? 1: 0;
                result.setxy(x, y, value);
            }
        }
        return result;
    }

    countLitPixels() : number {
        let result = 0;
        for (let row of this.cells) {
            for (let pixel of row) {
                if (pixel > 0) {
                    result += 1;
                }
            }
        }
        return result;
    }

    toString() : string {
        const rows = this.cells.map(row => row.map(v => (v > 0)? '#' : " ").join(''));
        return rows.join("\n");
    }
}

function createBlankImage(dimX: number, dimY : number) {
    const rows = [];
    for (let j = 0; j < dimY; j++) {
        rows.push(new Array(dimX).fill(0));
    }
    return new Image(rows);
}

function createImageFromInput(rows : string[]) : Image {
    const image = new Image(stripEmptyLines(rows)
        .map(r => r.split('').map(c => c=="#"? 1 : 0)));
    return image;
}

function applyEnhancements(enhancementString: string, image: Image, n: number) : Image {
    let enhancedImage = image; 
    console.log(enhancedImage.toString());
    for (let i = 1; i <= n; i++) {
        enhancedImage = enhancedImage.computeEnhancedImage(enhancementString);
        console.log(enhancedImage.toString());
    }
    return enhancedImage;
}

function part1(lines : string[]) {
    const [enhancementString, ...data] = lines;
    const image = createImageFromInput(stripEmptyLines(data));
    const enhancedImage = applyEnhancements(enhancementString, image, 2);
    const result = enhancedImage.countLitPixels();
    return result;
}

function part2(lines : string[]) {
    const [enhancementString, ...data] = lines;
    const image = createImageFromInput(stripEmptyLines(data));
    const enhancedImage = applyEnhancements(enhancementString, image, 50);
    const result = enhancedImage.countLitPixels();
    return result;
}

export { part1, part2, Image, createImageFromInput };