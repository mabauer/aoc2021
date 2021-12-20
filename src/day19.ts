import { listIncludes, Hashable, stripEmptyLines } from './utils'

class Point3 {

    x : number;
    y : number;
    z : number;

    constructor(x: number, y: number, z: number) {
        this.x = x; 
        this.y = y;
        this.z = z;
    }

    get(i : number) : number {
        if (i < 0 || i > 2) {
            throw new RangeError();
        } 
        return ((i == 0) ? this.x : (i == 1) ? this.y : this.z );
    }

    set(i : number, value: number) {
        if ( i == 0) {
            this.x = value;
        } 
        else if (i == 1) {
            this.y = value;
        }
        else if (i == 2) {
            this.z = value;
        }
        else {
            throw new RangeError();
        }
    }

    equals(other: Point3) : boolean {
        return (other && this.x == other.x && this.y == other.y && this.z == other.z);
    }

    get hashCode() : number {
        // TODO: number != int!
        return 31 * (31 * (31*7 + this.x) + this.y) + this.z;
    }

    toString() : string {
        return `(${this.x},${this.y},${this.z})`;
    }
}

function createPointFromList(coords: number[]) : Point3 {
    const [x, y, z] = coords;
    return new Point3(x, y, z);
}

function vPlus(p1: Point3, p2: Point3) : Point3 {
    return new Point3(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
}

function vMinus(p1: Point3, p2: Point3) : Point3 {
    return new Point3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
}

function manhattanDistance(p1: Point3, p2: Point3): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) + Math.abs(p1.z - p2.z);
}

const rotations = [
    [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ],
    [
        [1, 0, 0],
        [0, 0, -1],
        [0, 1, 0]
    ],
    [
        [1, 0, 0],
        [0, -1, 0],
        [0, 0, -1]
    ],
    [
        [1, 0, 0],
        [0, 0, 1],
        [0, -1, 0]
    ],
    [
        [0, -1, 0],
        [1, 0, 0],
        [0, 0, 1],
    ],
    [
        [0, 0, 1],
        [1, 0, 0],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, -1]
    ],
    [
        [0, 0, -1],
        [1, 0, 0],
        [0, -1, 0]
    ],
    [
        [-1, 0, 0],
        [0, -1, 0],
        [0, 0, 1]
    ],
    [
        [-1, 0, 0],
        [0, 0, -1],
        [0, -1, 0]
    ],
    [
        [-1, 0, 0],
        [0, 1, 0],
        [0, 0, -1]
    ],
    [
        [-1, 0, 0],
        [0, 0, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [-1, 0, 0],
        [0, 0, 1]
    ],
    [
        [0, 0, 1],
        [-1, 0, 0],
        [0, -1, 0]
    ],
    [
        [0, -1, 0],
        [-1, 0, 0],
        [0, 0, -1]
    ],
    [
        [0, 0, -1],
        [-1, 0, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, -1],
        [0, 1, 0],
        [1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 0, 1],
        [1, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, -1, 0],
        [1, 0, 0]
    ],
    [
        [0, -1, 0],
        [0, 0, -1],
        [1, 0, 0]
    ],
    [
        [0, 0, -1],
        [0, -1, 0],
        [-1, 0, 0]
    ],
    [
        [0, -1, 0],
        [0, 0, 1],
        [-1, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 0, -1],
        [-1, 0, 0]
    ]
];


function rotate(p : Point3, rot: number[][]) : Point3 {
    const result = new Point3(0, 0, 0);
    for (let y = 0; y < 3; y++) {
        let sum = 0;
        for (let x = 0; x < 3; x++) {
            sum += rot[y][x]*p.get(x); 
        }
        result.set(y, sum);
    }
    return result;
}

function convertToAbsolute(points : Point3[], scanner: Scanner) : Point3[] {
    return points.map(p => vPlus(rotate(p, scanner.orientation), scanner.position));
}

function computeFingerPrint(beacons : Point3[]) : Point3[] {
    const result = [];
    const todo = [...beacons];
    while (todo.length > 0) {
        const p1 = todo.pop()
        if (p1) {
            for (let p2 of todo) {
                result.push(new Point3((p2.x - p1.x), (p2.y - p1.y), (p2.z - p1.z)));
                result.push(new Point3((p1.x - p2.x), (p1.y - p2.y), (p1.z - p2.z)));
            }
        }
    }
    return result;
}

function intersect <T extends Hashable> (l1: T[], l2: T[]): T[] {
    const result = l1.filter(elem => listIncludes(l2, elem) );
    return result;
}

interface Scanner {
    position : Point3;
    orientation: number[][];
}

function compareScanners(beacons1 : Point3[], beacons2: Point3[], minOverlap=12) : Scanner|null {
    const fp1 = computeFingerPrint(beacons1);
    for (let rot of rotations) {
        const rotatedBeacons = beacons2.map(p => rotate(p, rot));
        const fp2 = computeFingerPrint(rotatedBeacons);
        const overlap = intersect(fp1, fp2);
        if (overlap.length >= minOverlap*(minOverlap-1)) {
            const diff = overlap[0];
            let r1 = new Point3(0, 0, 0);
            for (let p1 of beacons1) {
                for (let p2 of beacons1) {
                    if (vMinus(p1, diff).equals(p2) ) {
                        r1 = p1;
                    }
                }
            } 
            let r2 = new Point3(0, 0, 0);
            for (let p1 of beacons2) {
                for (let p2 of beacons2) {
                    if (vMinus(rotate(p1, rot), diff).equals(rotate(p2, rot))) {
                        r2 = p1;
                    }
                }
            }
            // console.log(`Reference beacon: ${r1} => ${r2}`);
            const shift = vMinus(r1, rotate(r2, rot));

            /* const matches = [];
            for (let p2 of beacons2) {
                const p2Transformed = vPlus(rotate(p2, rot), shift);
                if (listIncludes(beacons1, p2Transformed)) {
                    matches.push(p2Transformed);
                }
            }
            console.log(`Overlapping beacons: ${matches}`);
            */
            const result = {orientation: rot, position: shift};
            // console.log(result);
            return result
        }
    }
    return null;
}

function readScanners(lines: string[]) : Point3[][]{
    const beacons = [];
    let current = [];
    for (let line of stripEmptyLines(lines)) {
        if (line.startsWith("---")) { 
            if (current.length > 0) {
                beacons.push(current);
                current = [];
            }
        }
        else {
            const beacon = createPointFromList(line.trim().split(",").map(s => parseInt(s)));
            current.push(beacon);
        }
    }
    if (current.length > 0) {
        beacons.push(current)
    }
    return beacons;
}

function computeScanners(beacons: Point3[][]) : (Scanner|null)[] {
    const scanners : (Scanner|null)[] = [];
    const N = beacons.length;
    for (let i = 0; i < N; i++) {
        scanners.push(null);
    }
    scanners[0] = { position: new Point3(0, 0, 0), orientation: rotations[0]} ;

    while (scanners.includes(null)) {
        for (let s1 = 0; s1 < N; s1++) {
            const scanner1 = scanners[s1];
            if (!scanner1) {
                continue;
            }
            for (let s2 = 0; s2 < N; s2++) {
                if (s1 == s2 || scanners[s2]) {
                    continue;
                }
                // s1 known, s2 unknown
                console.log(`*** Trying scanners ${s1}, ${s2}...`);
                const result = compareScanners(convertToAbsolute(beacons[s1], scanner1), beacons[s2]);
                if (result) {
                    console.log(`*** Scanners ${s1}, ${s2} overlap!`); 
                    scanners[s2] = { 
                        position: result.position, 
                        orientation: result.orientation 
                    };
                    // console.log(scanners[s2]);
                }
            }
        }
    }
    console.log(scanners);
    return scanners;
}


function part1(lines : string[]) {
    const beacons = readScanners(lines);
    const scanners = computeScanners(beacons);
    const uniques = [];
    for (let s = 0; s < beacons.length; s++) {
        const scanner = scanners[s];
        if (scanner) {
            const bs = convertToAbsolute(beacons[s], scanner);
            for (let b of bs) {
                if (!listIncludes(uniques, b)) {
                    uniques.push(b);
                }
            }
        }
        else {
            throw new Error(`Scanner ${s} was not correctly determined!`);
        }
    }
    return uniques.length;
}

function part2(lines : string[]) {
    const beacons = readScanners(lines);
    const scanners = computeScanners(beacons);
    const distances = [];
    for (const s1 of scanners) {
        for (const s2 of scanners) {
            if (s1 && s2 && s1 != s2) {
                distances.push(manhattanDistance(s1.position, s2.position));
            }
        }
    }
    return Math.max(...distances);
}

export { readScanners, part1, part2, Point3, intersect, convertToAbsolute, computeFingerPrint, compareScanners, rotations, rotate };