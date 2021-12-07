import { assert } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day07';


suite("Day07", () => {
  
    test("example for part 1", () => {
        let example = ["16,1,2,0,4,2,7,1,2,14"];
        assert.equal(part1(example), 37);
    });

    test("example for part 2", () => {
        let example = ["16,1,2,0,4,2,7,1,2,14"];
        assert.equal(part2(example), 168);
    });

});