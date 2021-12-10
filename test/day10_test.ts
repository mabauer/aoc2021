import { assert } from 'chai';
import 'mocha';
import { part1, part2, ChunkParser, ERROR_NONE, ERROR_UNEXPECTED_END } from '../src/day10';

suite("Day10", () => {
  
    test("parse ()", () => {
        
        let example = "()";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ERROR_NONE);
    });

    test("parse (}", () => {
        let example = "(}";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), "}");
    });

    test("parse (", () => {
        let example = "(";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ERROR_UNEXPECTED_END);
    });

    test("parse )", () => {
        let example = ")";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ")");
    });

    test("parse ([])", () => {
        let example = "([])";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ERROR_NONE);
    }); 

    test("parse ()[]", () => {
        let example = "()[]";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ERROR_NONE);
    });  
    
    test("parse ())", () => {
        let example = "())";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), ")");
    });

    test("parse complex string", () => {
        let example = "{([(<{}[<>[]}>{[]{[(<()>";
        const parser = new ChunkParser(example);
        assert.equal(parser.parse(), "}");
    });

    test("example for part 1", () => {
        let example = [
            "[({(<(())[]>[[{[]{<()<>>",
            "[(()[<>])]({[<{<<[]>>(", 
            "{([(<{}[<>[]}>{[]{[(<()>", 
            "(((({<>}<{<{<>}{[]{[]{}", 
            "[[<[([]))<([[{}[[()]]]", 
            "[{[{({}]{}}([{[{{{}}([]", 
            "{<[[]]>}<{[{[{[]{()[[[]", 
            "[<(<(<(<{}))><([]([]()", 
            "<{([([[(<>()){}]>(<<{{", 
            "<{([{{}}[<[[[<>{}]]]>[]]"
        ];
        assert.equal(part1(example), 26397);
    });
    

    test("example for part 2", () => {
        let example = ["1", "2", "3"];
        assert.equal(part2(example), 0);
    });

});