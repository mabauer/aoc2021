import { assert } from 'chai';
import 'mocha';
import { readScanners, part1, part2, Point3, intersect, convertToAbsolute, computeFingerPrint, rotations, rotate, compareScanners } from '../src/day19';

const example = [
    "--- scanner 0 ---", 
    "404,-588,-901",
    "528,-643,409",
    "-838,591,734",
    "390,-675,-793",
    "-537,-823,-458",
    "-485,-357,347",
    "-345,-311,381",
    "-661,-816,-575",
    "-876,649,763",
    "-618,-824,-621",
    "553,345,-567",
    "474,580,667",
    "-447,-329,318",
    "-584,868,-557",
    "544,-627,-890",
    "564,392,-477",
    "455,729,728",
    "-892,524,684",
    "-689,845,-530",
    "423,-701,434",
    "7,-33,-71",
    "630,319,-379",
    "443,580,662",
    "-789,900,-551",
    "459,-707,401",
    "",
    "--- scanner 1 ---",
    "686,422,578",
    "605,423,415",
    "515,917,-361",
    "-336,658,858",
    "95,138,22",
    "-476,619,847",
    "-340,-569,-846",
    "567,-361,727",
    "-460,603,-452",
    "669,-402,600",
    "729,430,532",
    "-500,-761,534",
    "-322,571,750",
    "-466,-666,-811",
    "-429,-592,574",
    "-355,545,-477",
    "703,-491,-529",
    "-328,-685,520",
    "413,935,-424",
    "-391,539,-444",
    "586,-435,557",
    "-364,-763,-893",
    "807,-499,-711",
    "755,-354,-619",
    "553,889,-390",
    "",
    "--- scanner 2 ---",
    "649,640,665",
    "682,-795,504",
    "-784,533,-524",
    "-644,584,-595",
    "-588,-843,648",
    "-30,6,44",
    "-674,560,763",
    "500,723,-460",
    "609,671,-379",
    "-555,-800,653",
    "-675,-892,-343",
    "697,-426,-610",
    "578,704,681",
    "493,664,-388",
    "-671,-858,530",
    "-667,343,800",
    "571,-461,-707",
    "-138,-166,112",
    "-889,563,-600",
    "646,-828,498",
    "640,759,510",
    "-630,509,768",
    "-681,-892,-333",
    "673,-379,-804",
    "-742,-814,-386",
    "577,-820,562",
    "",
    "--- scanner 3 ---",
    "-589,542,597",
    "605,-692,669",
    "-500,565,-823",
    "-660,373,557",
    "-458,-679,-417",
    "-488,449,543",
    "-626,468,-788",
    "338,-750,-386",
    "528,-832,-391",
    "562,-778,733",
    "-938,-730,414",
    "543,643,-506",
    "-524,371,-870",
    "407,773,750",
    "-104,29,83",
    "378,-903,-323",
    "-778,-728,485",
    "426,699,580",
    "-438,-605,-362",
    "-469,-447,-387",
    "509,732,623",
    "647,635,-688",
    "-868,-804,481",
    "614,-800,639",
    "595,780,-596",
    "",
    "--- scanner 4 ---",
    "727,592,562",
    "-293,-554,779",
    "441,611,-461",
    "-714,465,-776",
    "-743,427,-804",
    "-660,-479,-426",
    "832,-632,460",
    "927,-485,-438",
    "408,393,-506",
    "466,436,-512",
    "110,16,151",
    "-258,-428,682",
    "-393,719,612",
    "-211,-452,876",
    "808,-476,-593",
    "-575,615,604",
    "-485,667,467",
    "-680,325,-822",
    "-627,-443,-432",
    "872,-547,-609",
    "833,512,582",
    "807,604,487",
    "839,-516,451",
    "891,-625,532",
    "-652,-548,-490",
    "30,-46,-14",
];

suite("Day19", () => {
  
    test("computeFingerprint", () => {
        const scan1 = [new Point3(0, 2, 0), new Point3(4, 1, 0), new Point3(3, 3, 0)];
        const scan2 = [new Point3(-1, -1, 0), new Point3(-5, 0, 0), new Point3(-2, 1, 0), new Point3(5, 7, 0)];
        const fp1 = computeFingerPrint(scan1);
        const fp2 = computeFingerPrint(scan2);
        console.log(fp1);
        console.log(fp2);
        assert.equal(intersect(fp1, fp2).length, 6);
    });

    test("compareScans wo Rotation", () => {
        const scan1 = [new Point3(0, 2, 0), new Point3(4, 1, 0), new Point3(3, 3, 0)];
        const scan2 = [new Point3(-1, -1, 0), new Point3(-5, 0, 0), new Point3(-2, 1, 0), new Point3(5, 7, 0)];
        const result = compareScanners(scan1, scan2, 3);
        if (result) {
            console.log(result);
            assert.deepEqual(result.orientation, [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ]);
            assert.isTrue(result.position.equals(new Point3(5, 2, 0)));
        }
    });

    test("compareScans with Rotation", () => {
        const scan1 = [new Point3(0, 2, 0), new Point3(4, 1, 0), new Point3(3, 3, 0)];
        const scan2 = [new Point3(-1, -1, 0), new Point3(-5, 0, 0), new Point3(-2, 1, 0), new Point3(5, 7, 0)];
        const rotatedScan = scan2.map(p => rotate(p, rotations[2]));
        const result = compareScanners(scan1, rotatedScan, 3);
        if (result) {
            console.log(result);
            assert.deepEqual(result.orientation, [ [ 1, 0, 0 ], [ 0, -1, 0 ], [ 0, 0, -1 ] ]);
            assert.isTrue(result.position.equals(new Point3(5, 2, 0)));
        }
    });

    test("compareScans for scanners 0, 1 from example", () => {
        const beacons = readScanners(example);
        console.log(beacons);
        const result = compareScanners(beacons[0], beacons[1]);
        console.log(result);
        assert.exists(result);
        if (result) {  
            console.log(result);
            assert.deepEqual(result.orientation,  [ [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, -1 ] ]);
            assert.isTrue(result.position.equals(new Point3(68, -1246, -43 ))); 
        }
    });

    test("compareScans for scanners 1, 4 from example", () => {
        const beacons = readScanners(example);
        const scanner1 = {
            position: new Point3(68, -1246, -43 ),
            orientation : [ [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, -1 ] ]
        };
        const result = compareScanners(convertToAbsolute(beacons[1], scanner1), beacons[4]);
        console.log(result);
        assert.exists(result);
        if (result) {  
            console.log(result);
            assert.deepEqual(result.orientation,  [ [ 0, -1, 0 ], [ 0, 0, -1 ], [ 1, 0, 0 ] ]);
            assert.isTrue(result.position.equals(new Point3(-20, -1133, 1061 ))); 
        }

    });


    test("example for part 1", () => {
        assert.equal(part1(example), 79);
    });

    test("example for part 2", () => {
        assert.equal(part2(example), 3621);
    });

});