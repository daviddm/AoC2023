import { sum } from "@util/sum";
import { log } from "console";
import { isEqual } from "lodash";

const getPermutations = (str: string, pre = ""): string[] => {
  const i = str.indexOf("?");
  // log(str, pre, i, str.slice(i + 1));
  if (i < 0) {
    return [`${pre}${str}`];
  }

  return [
    ...getPermutations(str.slice(i + 1), `${pre}${str.slice(0, i)}${"#"}`),
    ...getPermutations(str.slice(i + 1), `${pre}${str.slice(0, i)}${"."}`),
  ];
};

const getNumbersFromString = (str: string) => {
  return str
    .split(/[.]+/)
    .map((g) => g.length)
    .filter((n) => n > 0);
};

export const getPossibleSolutions = (str: string, groups: number[]) => {
  // log(str, groups);

  const perms = getPermutations(str);
  // log("perms", perms);

  const numbers = perms.map(getNumbersFromString);
  // log("numb", numbers);

  const same = numbers.filter((num) => isEqual(num, groups));
  // log("same", same);
  return same.length;
};

export const parseLine = (line: string): [string, number[]] => {
  const [str, groups] = line.split(" ");
  return [str, groups.split(",").map((s) => +s)];
};

export const run = async (list: string[]) => {
  return list
    .map(parseLine)
    .map((group) => getPossibleSolutions(...group))
    .reduce(sum, 0);
};
export const run2 = async (list: string[]) => {
  return list
    .map(parseLine)
    .map<[string, number[]]>((group) => [
      group[0].repeat(5),
      Array(5).fill(group[1]).flat(),
    ])
    .map((group) => log("group", group));
  // .map((group) => getPossibleSolutions(group[0], group[1]))
  // .map((num) => Math.pow(num, 5))
  // .reduce(sum, 0)
};
