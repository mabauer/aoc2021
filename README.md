Advent of Code 2021
===================

In 2021, I used [Advent of Code](https://adventofcode.com/), an Advent calendar of small programming puzzles, to get more familiar with [TypeScript](https://www.typescriptlang.org/).

The storyline of 2021 is a rescue mission on a submarine to recover the Elves' sleigh keys -- in order to save Cristmas once again...

I have implemented the solutions to the 25 puzzles that had to be solved on the submarine as simple command line based programs with the help of [ts-node](https://typestrong.org/ts-node/).

To run a solution:

    src/aoc <day>, where day = 1...25

Here is an overview on the puzzles:

* Day 01: *Sonar Sweep*: Analyze the depth measurements of the submarine's sonar -- basic list processing, in part 2 using a *sliding window*.

* Day 02: *Dive!*: Compute the submarine's destination, given a sequence of steering commands and various modes of interpreting them.

* Day 03: *Binary Diagnostic*: Figure out the submarine's oxygen generator and CO2 scrubber diagnostics -- involves some binary number processing.

* Day 04: *Giant Squid*: Play bingo with a giant squid, making sure that the squid wins :-). Involves computing the "winning" ones in an array of bingo boards.

* Day 05: *Hydrothermal Venture*: Compute a map of hydrothermal vents to safely navigate the submarine. Involves "drawing" vertical, horizontal and diagonal lines in a grid.

* Day 06: *Lanternfish*: Simulate a swarm of constantly reproducing lantern fish. Involves choosing a good data structure to represent the swarm, even for large numbers of fishes.

* Day 07: *The Treachery of Whales*: Position crabs cleverly (and quickly, i.e. with the smallest amount of moves) to defend yourselves againts an attacking whale. Mainly involves list processing and minimizing cost functions.

* Day 08: *Seven Segment Search*: Repair the wiring of seven-segment displays. My solution makes use of [backtracking](https://en.wikipedia.org/wiki/Backtracking).

* Day 09: *Smoke Basin*: Another grid based puzzle. Navigate around smoking lava tubes. Simulate the lava tubes and compute a "heatmap" of polluted areas.

* Day 10: *Syntax Scoring*: Fix the submarine's navigation system by analyzing (and correcting) syntax errors in a bracket language. I solved it using a recursice descent parser for the bracket language. (There are shorter solutions using a simple stack.)

* Day 11: *Dumbo Octopus*: Simulate a field of octopuses that emit flashes when they reach a certain energy level (which is increased by flashing octopuses in their neighbourhood). Another grid puzzle with analogies to [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

* Day 12: *Passage Pathing*: Count paths through a system of underwater caves, where small caves may only be visited once (part 1) or where one single small cave may ve visited twice (part2). Involves an adapted *depth first search (DFS)* in graphs.

* Day 13: *Transparent Origami*: Figure out a message that reveals itself when folding a transparent sheet of paper with black dots several times. Involves mirroring coordinates along an axis and keeping track of duplicates. I fought a bit with the lack of a good set implementation in TypeScript -- complex objects cannot easily be used with the [default set implementation](https://2ality.com/2015/01/es6-maps-sets.html#values) because it only considers '===' to determine if some object is contained in a set. (For such cases, there is a [better library](https://github.com/basarat/typescript-collections) available. I did *not* use it for this puzzle, however.)

* Day 19: *Beacon Scanner*: Combine the outputs of an array of beacon scanners. The positions of these scanners are unknown and each of them uses its own coordinate system. Involves transforming (shifting, rotating) coordinates into a common coordinate system by detecting and using "overlapping" beacons that can be seen by at least two scanners. It took me a while to figure out how the relative positions of the beacons between each other can be used to find the overlapping beacons. 
