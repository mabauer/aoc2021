import { assert } from 'chai';
import 'mocha';
import { part1, part2, find_mapping, convert_output } from '../src/day08';


suite("Day08", () => {
  
    test("example for part 1", () => {
        let example = ["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
            "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc"];
        assert.equal(part1(example), 5);
    });

    test("find_mapping", () => {
        // const signals = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb".split(/\s+/);
        // const outputs = "fdgacbe cefdb cefbgd gcbe".split(/\s+/);
        const signals = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab".split(/\s+/);
        const outputs = "cdfeb fcadb cdfeb cdbaf".split(/\s+/);
        const mapping = find_mapping(signals);
        console.log(mapping);
        const result = outputs.map(o => convert_output(o, mapping)).join('');
        console.log(result);
        assert.equal(result, "5353");
    });

});