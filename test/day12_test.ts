import { assert } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day12';


suite("Day12", () => {

    
    test("dfs 1", () => {
        let example = [ 
            "start-A",
            "start-b",
            "b-end", 
            "start-end", 
            "A-end", 
        ];
        assert.equal(part1(example), 3);
    });

    test("dfs 2", () => {
        let example = [ 
            "start-A",
            "start-b",
            "b-end", 
            "A-end", 
            "A-b"
        ];
        assert.equal(part1(example), 5);
    });

    test("dfs 3", () => {
        let example = [ 
            "start-A",
            "start-b",
            "b-end", 
            "A-end",
            "A-c", 
            "A-b"
        ];
        assert.equal(part1(example), 10);
    });



    test("example for part 1", () => {
        let example = [ 
            "start-A", 
            "start-b", 
            "A-c", 
            "A-b", 
            "b-d", 
            "A-end", 
            "b-end"
        ];
        assert.equal(part1(example), 10);
    });

    test("example for part 2", () => {
        let example = ["1", "2", "3"];
        assert.equal(part2(example), 0);
    });

});