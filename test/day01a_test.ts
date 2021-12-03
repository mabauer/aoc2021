import { assert } from 'chai';
import 'mocha';
import { part1 } from '../src/day01a';


suite("Day01a", () => {
  
    test("compute increasing measurements using reduce_pairs on two elements", () => {
        let example = ["199", "200"];
        assert.equal(part1(example), 1);
    });

    test("compute increasing measurements using reduce_pairs on one element", () => {
        let example = ["199"];
        assert.equal(part1(example), 0);
    });

    test("compute increasing measurements using reduce_pairs", () => {
        let example = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"];
        assert.equal(part1(example), 7);
    });

});