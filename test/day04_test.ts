import { assert } from 'chai';
import 'mocha';
import { part1, part2, Board, play_part1, play_part2 } from '../src/day04';


suite("Day04", () => {

    test("find winning horizontal sequence", () => {
        let example = [
            [14, 21, 17, 24,  4],
            [10, 16, 15,  9, 19],
            [18,  8, 23, 26, 20],
            [22, 11, 13,  6,  5],
            [ 2,  0, 12,  3,  7]
        ];
        const board = new Board(example); 
        const numbers_drawn = new Set<number>([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24]);

        assert.deepEqual(board.winningSequence(numbers_drawn), [14, 21, 17, 24,  4]);
    });

    test("find winning vertical sequence", () => {
        let example = [
            [14, 21, 17, 24,  4],
            [10, 16, 15,  9, 19],
            [18,  8, 23, 26, 20],
            [22, 11, 13,  6,  5],
            [ 2,  0, 12,  3,  7]
        ];
        const board = new Board(example); 
        const numbers_drawn = new Set<number>([14, 10, 17, 23, 13, 15, 21, 12]);

        assert.deepEqual(board.winningSequence(numbers_drawn), [17, 15, 23, 13, 12]);
    });

    test("example for part 1", () => {
        let example1 = [
            [22, 13, 17, 11,  0],
            [ 8,  2, 23,  4, 24],
            [21,  9, 14, 16,  7],
            [ 6, 10,  3, 18,  5],
            [ 1, 12, 20, 15, 19]
        ];
        let example2 = [
            [ 3, 15,  0,  2, 22],
            [ 9, 18, 13, 17,  5],
            [19,  8,  7, 25, 23],
            [20, 11, 10, 24,  4],
            [14, 21, 16, 12,  6]
        ];
        let example3 = [
            [14, 21, 17, 24,  4],
            [10, 16, 15,  9, 19],
            [18,  8, 23, 26, 20],
            [22, 11, 13,  6,  5],
            [ 2,  0, 12,  3,  7]
        ];
        const numbers_to_draw = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24];
        const boards = [];
        boards.push(new Board(example1));
        boards.push(new Board(example2));
        boards.push(new Board(example3));
        const result = play_part1(boards, numbers_to_draw);
        assert.equal(result, 4512);
    });

    test("example for part 2", () => {
        let example1 = [
            [22, 13, 17, 11,  0],
            [ 8,  2, 23,  4, 24],
            [21,  9, 14, 16,  7],
            [ 6, 10,  3, 18,  5],
            [ 1, 12, 20, 15, 19]
        ];
        let example2 = [
            [ 3, 15,  0,  2, 22],
            [ 9, 18, 13, 17,  5],
            [19,  8,  7, 25, 23],
            [20, 11, 10, 24,  4],
            [14, 21, 16, 12,  6]
        ];
        let example3 = [
            [14, 21, 17, 24,  4],
            [10, 16, 15,  9, 19],
            [18,  8, 23, 26, 20],
            [22, 11, 13,  6,  5],
            [ 2,  0, 12,  3,  7]
        ];
        const numbers_to_draw = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
        const boards = [];
        boards.push(new Board(example1));
        boards.push(new Board(example2));
        boards.push(new Board(example3));
        const result = play_part2(boards, numbers_to_draw);
        assert.equal(result, 1924);
    });

});