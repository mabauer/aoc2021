import { assert } from 'chai';
import 'mocha';
import { part1, part2, Swarm } from '../src/day06';


suite("Day06", () => {
  
    test("example for part 1 and 2", () => {
        let example = [3,4,3,1,2];
        const swarm = new Swarm(example);
        swarm.play(18);
        assert.equal(swarm.getNumberOfFishes(), 26);
        swarm.play(80-18);
        assert.equal(swarm.getNumberOfFishes(), 5934);
    });

});