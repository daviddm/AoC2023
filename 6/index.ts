type Race = {
  time: number;
  distance: number;
};

type RaceSolution = {
  speed: number;
  distance: number;
};

const getRaceSolutions = (race: Race) => {
  const solutions: RaceSolution[] = [];
  for (let i = 0; i < race.time; i++) {
    const traveledDistance = i * (race.time - i);
    if (race.distance >= traveledDistance) {
      continue;
    }
    solutions.push({ distance: traveledDistance, speed: i });
  }
  return solutions;
};

export const run = async (list: string[]) => {
  const times = list[0]
    .split(":")[1]
    .trim()
    .split(/[\s]+/)
    .map((str) => +str);
  const distances = list[1]
    .split(":")[1]
    .trim()
    .split(/[\s]+/)
    .map((str) => +str);

  const races: Race[] = times.map((time, i) => {
    return { time, distance: distances[i] };
  });

  const raceSolutions = races.map((race) => getRaceSolutions(race));

  return raceSolutions
    .map((solution) => solution.length)
    .reduce((product, current) => product * current, 1);
};

export const run2 = async (list: string[]) => {
  const time = +list[0].split(":")[1].trim().split(/[\s]+/).join("");
  const distance = +list[1].split(":")[1].trim().split(/[\s]+/).join("");

  const race: Race = {
    distance,
    time,
  };
  const raceSolution = getRaceSolutions(race);

  return raceSolution.length;
};
