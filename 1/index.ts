import { sum } from "@util/sum";

export const run = async (list: string[]) => {
  return list
    .map((chars) => {
      const charsTemp = chars.split("");
      const first = charsTemp.find((char) => !isNaN(+char));
      const last = charsTemp.reverse().find((char) => !isNaN(+char));
      return +`${first}${last}`;
    })
    .reduce(sum, 0);
};

export const run2 = async (list: string[]) => {
  return list.map(mapToCalibration).reduce(sum, 0);
};

const mapToCalibration = (chars: string) => {
  let first = -1;
  let last = -1;

  for (let i = 0; i < chars.length; i++) {
    if (first < 0) {
      const temp = numberFinder(chars[i], i, chars);
      if (typeof temp === "number") {
        first = temp;
      }
    }
    if (last < 0) {
      const index = chars.length - i - 1;
      const temp = numberFinder(chars[index], index, chars);
      if (typeof temp === "number") {
        last = temp;
      }
    }
    if (first > -1 && last > -1) {
      break;
    }
  }

  return first * 10 + last;
};

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const numberFinder = (char: string, i: number, arr: string) => {
  if (!isNaN(+char)) {
    return +char;
  }
  const str = arr.slice(i);

  let strFind = undefined;

  Object.entries(numberMap).some(([numStr, num]) => {
    if (str.startsWith(numStr)) {
      strFind = num;
    }
  });
  return strFind;
};
