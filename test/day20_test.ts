import { assert } from 'chai';
import 'mocha';
import { part1, part2, Image, createImageFromInput } from '../src/day20';


suite("Day20", () => {
  
    test("getBinaryStringFor", () => {
        let example = [
            "#..#.",
            "#....",
            "##..#",
            "..#..",
            "..###"
        ];
        const image = createImageFromInput(example);
        console.log(image);
        assert.equal(image.getBinaryStringForPixel(2, 2, 0), "000100010");
    });

    test("example for part1", () => {
        const enhancementString = [
            "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##",
            "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###",
            ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.",
            ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....",
            ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..",
            "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....",
            "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#"
        ].join("");
        const example = [
            "...............",
            "...............",
            "...............",
            "...............",
            "...............",
            ".....#..#......",
            ".....#.........",
            ".....##..#.....",
            ".......#.......",
            ".......###.....",
            "...............",
            "...............",
            "...............",
            "...............",
            "..............."
        ];
        assert.equal(part1([enhancementString].concat(example)), 35);
    });

    test("example for part2", () => {
        const enhancementString = [
            "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##",
            "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###",
            ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.",
            ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....",
            ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..",
            "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....",
            "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#"
        ].join("");
        const example = [
            "...............",
            "...............",
            "...............",
            "...............",
            "...............",
            ".....#..#......",
            ".....#.........",
            ".....##..#.....",
            ".......#.......",
            ".......###.....",
            "...............",
            "...............",
            "...............",
            "...............",
            "..............."
        ];
        assert.equal(part2([enhancementString].concat(example)), 3351);
    });

});