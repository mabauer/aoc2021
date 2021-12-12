// import { integers } from './utils'


interface Graph {
    [node: string]: string[];
}

const START = "start";
const END = "end";

function isLarge(node : string) : boolean {
    return (node == node.toUpperCase());
}

function dfs(g: Graph, node: string, visited: Set<string> = new Set()) : number {

    if (node == END) {
        return 1;
    }
    console.log(`${node}:`);
    console.log(visited);
    if (!isLarge(node)) {
        visited.add(node);
    }
    let paths = 0;
    for (let neighbour of g[node]) {
        if (!visited.has(neighbour) ) {
            const pn = dfs(g, neighbour, visited);
            paths += pn;
            console.log(`dfs(${neighbour})=${pn} -> ${paths}`)

        }
    }
    if (!isLarge(node)) {
        visited.delete(node);
    }
    return paths;
}

function createGraph(edges : string[]) : Graph {
    const g : Graph = {};
    for (let edge of edges) {
        const [from, to] = edge.split("-");
        if (!(from in g)) {
            g[from] = [];            
        }
        if (!(to in g)) {
            g[to] = [];
        }
        g[from].push(to);
        g[to].push(from);
    }
    return g;

}

function part1(lines : string[]) {
    const g = createGraph(lines.filter(s => s.length > 0));
    console.log(g);
    let result = dfs(g, START);
    return result;
}

function part2(lines : string[]) {
    // let ints = integers(lines)
    let result = 0;
    return result;
}

export { part1, part2 };