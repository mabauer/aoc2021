import { assert } from 'chai';
import 'mocha';
import { part1, part2, parseLine, Point } from '../src/day05';


suite("Day05", () => {
  
    test("parseLine", () => {
        let example = "1,2 -> 3,4";
        const line = parseLine(example);
        assert.deepEqual(line[0], new Point(1, 2))
        assert.deepEqual(line[1], new Point(3, 4))
        // assert.equal(line[0].x, 1);
        // assert.equal(line[0].y, 2);
        // assert.equal(line[1].x, 3);
        // assert.equal(line[1].y, 4);
    });

    test("example for part 1", () => {
        let example = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];  
        assert.equal(part1(example), 5);
    });

    test("example for part 2", () => {
        let example = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];  
        assert.equal(part2(example), 12);
    });

});