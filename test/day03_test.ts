import { assert } from 'chai';
import 'mocha';
import { part1, part2, countChars } from '../src/day03';


suite("Day03", () => {
  
    test("countChars", () => {
        let word = "011110011100";
        assert.equal(countChars(word, "1"), 7);
        assert.equal(countChars(word, "0"), 5);
    });

    test("example for part 1", () => {
        let example = [
            "00100",
            "11110",
            "10110",
            "10111",
            "10101",
            "01111",
            "00111",
            "11100",
            "10000",
            "11001",
            "00010",
            "01010"];
        assert.equal(part1(example), 198);
    });

    test("example for part 2", () => {
        let example = [
            "00100",
            "11110",
            "10110",
            "10111",
            "10101",
            "01111",
            "00111",
            "11100",
            "10000",
            "11001",
            "00010",
            "01010"];
        assert.equal(part2(example), 230);
    });

});