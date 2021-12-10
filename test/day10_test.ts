import { assert } from 'chai';
import 'mocha';
import { part1, part2, ChunkChecker, ERROR_NONE, ERROR_UNEXPECTED_END } from '../src/day10';

suite("Day10", () => {
  
    test("parse ()", () => {
        
        let example = "()";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ERROR_NONE);
    });

    test("parse (}", () => {
        let example = "(}";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), "}");
    });

    test("parse (", () => {
        let example = "(";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ERROR_UNEXPECTED_END);
    });

    test("parse )", () => {
        let example = ")";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ")");
    });

    test("parse ([])", () => {
        let example = "([])";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ERROR_NONE);
    }); 

    test("parse ()[]", () => {
        let example = "()[]";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ERROR_NONE);
    });  
    
    test("parse ())", () => {
        let example = "())";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), ")");
    });

    test("parse complex string", () => {
        let example = "{([(<{}[<>[]}>{[]{[(<()>";
        const checker = new ChunkChecker(example);
        assert.equal(checker.check(), "}");
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
    
    test("fix complex string", () => {
        let example = "[({(<(())[]>[[{[]{<()<>>";
        const checker = new ChunkChecker(example, true);
        assert.equal(checker.check(), ERROR_NONE);
        // checker.check();
        assert.equal(checker.fixes.join(''), "}}]])})]");
    });

    
    test("example for part 2", () => {
        let example = [
            "[({(<(())[]>[[{[]{<()<>>", // Complete by adding }}]])})].
            "[(()[<>])]({[<{<<[]>>(",   // Complete by adding )}>]}).
            "(((({<>}<{<{<>}{[]{[]{}",  // Complete by adding }}>}>)))).
            "{<[[]]>}<{[{[{[]{()[[[]",  // Complete by adding ]]}}]}]}>.
            "<{([{{}}[<[[[<>{}]]]>[]]", // Complete by adding ])}>.
        ];
        assert.equal(part2(example), 288957);
    });

});