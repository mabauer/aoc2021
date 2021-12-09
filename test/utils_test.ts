import { assert } from 'chai';
import 'mocha';
import { find_matching } from '../src/utils';


suite("find_matching", () => {
  
    test("find possible matching", () => {
        const candidates = {
            'cqvc': ['wheat'],
            'nhx': ['fish'],
            'rrjb': ['sesame'],
            'xmhsbd': ['wheat', 'peanuts', 'fish'],
            'ntft': ['eggs', 'sesame', 'fish'],
            'xzhxj': ['wheat', 'eggs', 'shellfish'],  // + soy
            'kfxr': ['eggs', 'peanuts', 'nuts', 'soy'],
            'chbtp': ['sesame', 'shellfish', 'fish', 'soy']
        }
        const matching = {
            'cqvc': 'wheat', 
            'nhx': 'fish', 
            'rrjb': 'sesame', 
            'xmhsbd': 'peanuts', 
            'ntft': 'eggs', 
            'xzhxj': 'shellfish', 
            'kfxr': 'nuts', 
            'chbtp': 'soy'
        }
        const result = find_matching(candidates);
        console.log(result);
        assert.deepEqual(result, matching);
    });

    test("impossible matching", () => {
        const impossible = {
            'cqvc': ['wheat'],
            'nhx': ['fish'],
            'rrjb': ['sesame'],
            'xmhsbd': ['wheat', 'peanuts', 'fish'],
            'ntft': ['eggs', 'sesame', 'fish'],
            'xzhxj': ['wheat', 'eggs', 'shellfish'],
            'kfxr': ['eggs', 'peanuts', 'nuts', 'soy'],
            'chbtp': ['sesame', 'shellfish', 'fish']  // soy is missing here!
        }
        assert.isNull(find_matching(impossible));
    });

});