import { integers, stripEmptyLines } from './utils'

// Fixed (found when porting to tinyscript): the loops ran up to pos <= ints.length and so compared
// with ints[ints.length], i.e. undefined, and the empty last line of the input gave NaN.
// Both comparisons are always false in Javascript, so the results were right by chance.
function part1(lines : string[]) {
    let ints = integers(stripEmptyLines(lines));
    var result = 0;
    for (let pos = 1; pos < ints.length; pos++) {
        if (ints[pos-1] < ints[pos])
            result += 1;
    }
    return result;
}

function part2(lines : string[]) {
    let ints = integers(stripEmptyLines(lines))
    let result = 0;
    // Comparing the measurements with sliding windows can be reduced to 
    // comparing the 1st element of the "previous" windows with the 3rd element of the current window!
    for (var pos = 3; pos < ints.length; pos++) {
        if (ints[pos-3] < ints[pos])
            result += 1;
    }
    return result;
}

export { part1, part2 };