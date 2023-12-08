import { log } from "console";

type Node = {
  id: string;
  L: string;
  R: string;
};

type NodesLookup = Record<string, Node>;

export const run = async (list: string[]) => {
  // Do Stuff
  const instructions: ("L" | "R")[] = list[0].split("") as any;
  log("instructions", instructions);

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
  log("nodes", nodes);

  let done = false;
  let i = 0;
  let currentId = "AAA";
  while (!done) {
    log("currentId", currentId);
    const direction = instructions[i];
    const nextNode = nodes[currentId][direction];
    if (nextNode === "ZZZ") {
      done = true;
    }
    currentId = nextNode;
    i++;
  }

  return i;
};
