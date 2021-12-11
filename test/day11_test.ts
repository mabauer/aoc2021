import { assert } from 'chai';
import 'mocha';
import { part1, part2, Swarm } from '../src/day11';


suite("Day11", () => {
  
    test("small example for part 1", () => {
        const example = [
            "11111",
            "19991",
            "19191",
            "19991",
            "11111"
        ];
        const fst_generation = [
            "34543",
            "40004",
            "50005",
            "40004",
            "34543"
        ];
        const swarm = new Swarm(example.map(r => r.split('').map(c => parseInt(c))));
        assert.equal(swarm.nextGeneration(), 9);
        assert.deepEqual(swarm.getRows(), fst_generation);
    });

    test("example for part 1", () => {
        const example = [
            "5483143223",
            "2745854711",
            "5264556173",
            "6141336146",
            "6357385478",
            "4167524645",
            "2176841721",
            "6882881134",
            "4846848554",
            "5283751526"
        ];
        const swarm = new Swarm(example.map(r => r.split('').map(c => parseInt(c))));
        assert.equal(swarm.play(10), 204);
        assert.equal(swarm.play(90, 204), 1656);
    });

    test("isSyncronized on example", () => {
        let example = [
            "5483143223",
            "2745854711",
            "5264556173",
            "6141336146",
            "6357385478",
            "4167524645",
            "2176841721",
            "6882881134",
            "4846848554",
            "5283751526"];
        const swarm = new Swarm(example.map(r => r.split('').map(c => parseInt(c))));
        swarm.play(195);
        console.log(swarm.getRows().join("\n"));
        assert.isTrue(swarm.isSynchronized());
    });

    test("example for part 2", () => {
        let example = [
            "5483143223",
            "2745854711",
            "5264556173",
            "6141336146",
            "6357385478",
            "4167524645",
            "2176841721",
            "6882881134",
            "4846848554",
            "5283751526"];
        assert.equal(part2(example), 195);
    });

});