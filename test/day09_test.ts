import { assert } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day09';


suite("Day09", () => {
  
    test("example for part 1", () => {
        let example = [
            "2199943210",
            "3987894921",
            "9856789892",
            "8767896789",
            "9899965678"];
        assert.equal(part1(example), 15);
    });

    test("example for part 2", () => {
        let example = [
            "2199943210",
            "3987894921",
            "9856789892",
            "8767896789",
            "9899965678"];
        assert.equal(part2(example), 1134);
    });

});