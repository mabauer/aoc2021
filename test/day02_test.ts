import { assert } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day02';


suite("Day02", () => {
  
    test("example for part 1", () => {
        let example = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];
        assert.equal(part1(example), 150);
    });

    test("example for part 2", () => {
        let example = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];
        assert.equal(part2(example), 900);
    });

});