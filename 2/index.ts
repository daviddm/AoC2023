import { sum } from "@util/sum";

export type Restriction = {
  red: number;
  green: number;
  blue: number;
};

type Reveal = Restriction;

export type Game = {
  id: number;
  restriction: Restriction;
  reveals: Reveal[];
};

export const isGamePossible = (game: Game) => {
  return game.reveals.every((reveal) => {
    return (
      reveal.blue <= game.restriction.blue &&
      reveal.green <= game.restriction.green &&
      reveal.red <= game.restriction.red
    );
  });
};

export const parseGame = (gameString: string): Omit<Game, "restriction"> => {
  const [original, id, revealsString] = gameString.match(
    /Game (\d+): (.*)$/
  ) as RegExpMatchArray;
  return {
    id: +id,
    reveals: parseReveals(revealsString),
  };
};

const parseReveals = (revealsString: string): Reveal[] => {
  return revealsString.split(";").map<Reveal>((revealString): Reveal => {
    const blue = revealString.match(/(\d+) blue/) ?? [];
    const red = revealString.match(/(\d+) red/) ?? [];
    const green = revealString.match(/(\d+) green/) ?? [];
    // log(blue);
    return {
      blue: +(blue[1] ?? 0),
      red: +(red[1] ?? 0),
      green: +(green[1] ?? 0),
    };
  });
};

export const run = async (list: string[], restriction: Restriction) => {
  return list
    .map<Game>((game) => ({
      ...parseGame(game),
      restriction,
    }))
    .filter(isGamePossible)
    .map((game) => game.id)
    .reduce(sum, 0);
};

export const leastCubes = (restrictions: Reveal[]): Reveal => {
  let blue = 0;
  let green = 0;
  let red = 0;
  restrictions.forEach((restriction) => {
    if (restriction.blue > blue) {
      blue = restriction.blue;
    }
    if (restriction.green > green) {
      green = restriction.green;
    }
    if (restriction.red > red) {
      red = restriction.red;
    }
  });
  return {
    blue,
    green,
    red,
  };
};

export const run2 = async (list: string[]) => {
  return list
    .map((game) => parseGame(game))
    .map((game) => leastCubes(game.reveals))
    .map((reveal) => reveal.blue * reveal.green * reveal.red)
    .reduce(sum, 0);
};
