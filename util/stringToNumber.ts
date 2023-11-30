export const stringToNumber = (list: string[], radix = 10) =>
  list.map((str) => parseInt(str, radix));
