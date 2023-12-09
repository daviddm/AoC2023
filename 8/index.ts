import { lcm } from "@util/lcm";

type Node = {
  id: string;
  L: string;
  R: string;
};

type NodesLookup = Record<string, Node>;

export const run = async (list: string[], ghost = false) => {
  const instructions: ("L" | "R")[] = list[0].split("") as any;

  const nodes = list
    .slice(2)
    .map<Node>((raw) => {
      const parts = raw.split(" = ");
      const [L, R] = parts[1].slice(1, -1).split(", ");
      return {
        id: parts[0],
        L,
        R,
      };
    })
    .reduce((lookup, curr) => {
      lookup[curr.id] = curr;
      return lookup;
    }, {} as NodesLookup);

  let currentIds = !ghost
    ? ["AAA"]
    : Object.keys(nodes).filter((node) => node.endsWith("A"));

  const steps = currentIds.map((startId) => {
    let i = 0;
    let currentId = startId;

    while (!currentId.endsWith("Z")) {
      const direction = instructions[i % instructions.length];
      const nextNode = nodes[currentId][direction];
      currentId = nextNode;
      i++;
    }
    return i;
  });

  return steps.reduce((acc, cur) => lcm(acc, cur), 1);
};
