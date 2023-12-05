import { log } from "console";

type Map = {
  name: string;
  rawMaps: string[];
  ranges: Range[];
};

type Range = {
  srcStart: number;
  dstStart: number;
  range: number;
};

export const getSeeds = (list: string) => {
  return list
    .split(" ")
    .slice(1)
    .map((str) => +str);
};

const parseMap = (map: Map): Range[] => {
  return map.rawMaps.map((raw) => {
    const [dstStart, srcStart, range] = raw.split(" ").map((str) => +str);
    return { dstStart, srcStart, range } as any;
  });
};

const isWithinRange = (
  src: number,
  range: Range,
  returnDirection = false
): boolean | -1 | 0 | 1 => {
  const found =
    src >= range.srcStart && src <= range.srcStart + range.range - 1;

  if (returnDirection) {
    if (found) {
      return 0;
    }
    if (src < range.srcStart) {
      return -1;
    }
    return 1;
  }
  return found;
};

const isWithinDstRange = (dst: number, range: Range): boolean => {
  return dst >= range.dstStart && dst <= range.dstStart + range.range - 1;
};

const getDstInRange = (src: number, range: Range): number => {
  const diff = src - range.srcStart;
  return range.dstStart + diff;
};

const getSrcInRange = (dst: number, range: Range): number => {
  const diff = dst - range.dstStart;
  return range.srcStart + diff;
};

const binarySearchForRange = (
  src: number,
  ranges: Range[]
): Range | undefined => {
  // log("bin", ranges);
  let left = 0;
  let right = ranges.length - 1;
  let done = false;
  while (!done) {
    const current = Math.floor((right - left) / 2 + left);
    const direction = isWithinRange(src, ranges[current], true);
    // log("s", current, direction);
    if (direction === 0) {
      done = true;
      return ranges[current];
    }
    if (direction === -1) {
      right = current - 1;
      if (right <= 0) {
        done = true;
      }
      continue;
    }
    if (left >= ranges.length - 1) {
      done = true;
    }
    left = current + 1;
    continue;
  }

  return;
};

const findSeedToLocations = (seed: number, maps: Map[]): number => {
  const location = maps.reduce((src, map) => {
    // const validRange = binarySearchForRange(src, map.ranges);
    const validRange = map.ranges.find((range) => isWithinRange(src, range));
    if (!validRange) {
      return src;
    }
    const dst = getDstInRange(src, validRange);
    return dst;
  }, seed);

  return location;
};

const findLocationToSeed = (location: number, maps: Map[]): number => {
  const seed = maps.reduce((dst, map) => {
    const validRange = map.ranges.find((range) => isWithinDstRange(dst, range));
    // log("find range", map.name, dst, validRange);
    if (!validRange) {
      // log("straigth map", dst)
      return dst;
    }
    const src = getSrcInRange(dst, validRange);
    // log("src map", src)
    return src;
  }, location);

  return seed;
};

const isValidSeed = (seed: number, seedRanges: [number, number][]): boolean => {
  return seedRanges.some((rangeValues) => {
    const [start, range] = rangeValues;
    // log("valid seed", seed, start, range);
    return seed >= start && seed <= start + range - 1;
  });
};

export const run = async (list: string[], seedRange = false) => {
  const groupedList = list
    .reduce<Map[]>(
      (newList, row) => {
        if (row === "") {
          newList.push({ name: "", rawMaps: [], ranges: {} } as any);
          return newList;
        }
        if (row.match(/^[a-z]/)) {
          newList[newList.length - 1].name = row;
          return newList;
        }
        newList[newList.length - 1].rawMaps.push(row);
        return newList;
      },
      [{ name: "", rawMaps: [], ranges: {} }] as any[]
    )
    .map((map) => {
      map.ranges = parseMap(map).sort((a, b) => a.dstStart - b.dstStart);
      return map;
    });

  const seeds = getSeeds(list[0]);
  const listWithoutSeeds = groupedList.slice(1);
  if (!seedRange) {
    log(seeds);

    const seedToLocations = seeds.map((seed) =>
      findSeedToLocations(seed, listWithoutSeeds)
    );

    return seedToLocations.sort((a, b) => a - b)[0];
  }

  const seedRanges = seeds.reduce((ranges, seed, i) => {
    if (i % 2 === 0) {
      ranges.push([seed]);
      return ranges;
    }
    ranges[ranges.length - 1].push(seed);
    return ranges;
  }, [] as any[]);
  log("seedRanges", seedRanges);

  let bestLocation = Infinity;

  const startExec = performance.now();
  // for (let i = 0; i < seedRanges.length; i++) {
  // for (let i = 0; i < seedRanges.length; i++) {

  const locationRanges = listWithoutSeeds[listWithoutSeeds.length - 1].ranges;
  const lastRange = locationRanges[locationRanges.length - 1];
  const highestLocation = lastRange.dstStart + lastRange.range;

  const reversedList = listWithoutSeeds.reverse();

  log("lowest", locationRanges[0].srcStart);
  log("highest", highestLocation);
  for (let i = locationRanges[0].srcStart; i <= highestLocation; i++) {
    if(i % 100_000_000 === 0) {
      log("i", i)
    } 
    // const [rangeStart, range] = seedRanges[i];
    // log("range", i, rangeStart, range);
    // for (let seed = rangeStart; seed < rangeStart + range; seed++) {
    const locationToSeed = findLocationToSeed(i, reversedList);
    // log("i", i, locationToSeed);
    if (isValidSeed(locationToSeed, seedRanges as any) && bestLocation > i) {
      // if (bestLocation > i) {
        // log("new best", i)
      bestLocation = i;
    }
    // }
  }

  log((performance.now() - startExec).toFixed(4), "ms");

  return bestLocation;
};
