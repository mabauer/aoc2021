import { assert } from 'chai';
import 'mocha';
import { part1, part2, parseDots, foldDots, display } from '../src/day13';


suite("Day13", () => {
  
    test("example for part 1", () => {
        const example = [
            "6,10",
            "0,14",
            "9,10",
            "0,3",
            "10,4",
            "4,11",
            "6,0",
            "6,12",
            "4,1",
            "0,13",
            "10,12",
            "3,4",
            "3,0",
            "8,4",
            "1,10",
            "2,14",
            "8,10",
            "9,0"];
        const dots = parseDots(example);
        foldDots("y", 7, dots);
        assert.equal(dots.length, 17)
        foldDots("x", 5, dots);
        assert.equal(dots.length, 16);
        foldDots("y", 2, dots);
        assert.equal(dots.length, 9);       

    });

    test("example for part 2", () => {
        const example = [
            "6,10",
            "0,14",
            "9,10",
            "0,3",
            "10,4",
            "4,11",
            "6,0",
            "6,12",
            "4,1",
            "0,13",
            "10,12",
            "3,4",
            "3,0",
            "8,4",
            "1,10",
            "2,14",
            "8,10",
            "9,0"];
        const dots = parseDots(example);
        foldDots("y", 7, dots);
        foldDots("x", 5, dots);
        display(dots);
    });

});