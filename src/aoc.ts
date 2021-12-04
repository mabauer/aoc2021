#!/usr/bin/env ts-node

import fs from 'fs' ;
import path from 'path';

async function read_inputfile(filename: string) {
    const data = await fs.promises.readFile("." +  path.sep + "input" + path.sep + filename, 'utf8');
    const lines : string[] = data.split("\n");
    return lines;
}

async function main() {
    if (process.argv.length <= 2 ) {
        console.log("Usage: aoc <day>, where day = 1...25");
        process.exit(1);
    }
    const day = parseInt(process.argv[2]);
    if (Number.isNaN(day) || day < 1 || day > 25) {
        throw RangeError();
    }
    const inputFile = `input${day.toString().padStart(2, "0")}.txt`;
    const moduleFile = `day${day.toString().padStart(2, "0")}`;
    const part1 = require("." + path.sep + moduleFile)["part1"];
    const part2 = require("." + path.sep + moduleFile)["part2"];

    const lines = await read_inputfile(inputFile)
    const result1 = part1(lines);
    console.log(`Day ${day}: The answer for part one is: ${result1}`)  
    const result2 = part2(lines);
    console.log(`Day ${day}: The answer for part two is: ${result2}`)  
}

main();