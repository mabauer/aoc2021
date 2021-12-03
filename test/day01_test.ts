import { assert } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day01';


suite("Day01", () => {
  
    test("compute increasing measurements", () => {
        let example = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"];
        assert.equal(part1(example), 7);
    });

    test("compute increasing measurements using sliding windows", () => {
        let example = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"];
        assert.equal(part2(example), 5);
    });

});