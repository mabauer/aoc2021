// import { integers } from './utils'


interface Graph {
    [node: string]: string[];
}

const START = "start";
const END = "end";

function isSmall(node : string) : boolean {
    return (node == node.toLowerCase());
}

function dfs(g: Graph, node: string, allow2ndVisitOnce=false, visited: Set<string> = new Set()) : number {

    if (node == END) {
        return 1;
    }
    visited = new Set([...visited]);
    if (isSmall(node)) {
        visited.add(node);
    }
    let paths = 0;
    for (let neighbour of g[node]) {
        if (neighbour != START && visited.has(neighbour) && allow2ndVisitOnce) {
            paths += dfs(g, neighbour, false, visited);
        } 
        if (!visited.has(neighbour)) {
            paths += dfs(g, neighbour, allow2ndVisitOnce, visited);
        }
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
    const g = createGraph(lines.filter(s => s.length > 0));
    console.log(g);
    let result = dfs(g, START, true);
    return result;
}

export { part1, part2 };