import { sum } from "@util/sum";

type Lotto = {
  id: number;
  winningNumbers: Record<string, boolean>;
  number: number[];
};

export const parseGame = (gameString: string): Lotto => {
  const [_gameString, id] = gameString.match(
    /Card\s+(\d+):/
  ) as RegExpMatchArray;
  const [_, win, num] = gameString.split(/\||:/);
  return {
    id: +id,
    winningNumbers: win
      .trim()
      .split(/\s+/)
      .map((str) => +str)
      .reduce((win, curr) => {
        win[curr] = true;
        return win;
      }, {} as Record<string, boolean>),
    number: num
      .trim()
      .split(/\s+/)
      .map((str) => +str),
  };
};

const winnings = (game: Lotto) => {
  return game.number.reduce((sum, curr) => {
    if (game.winningNumbers[curr]) {
      return sum + 1;
    }
    return sum;
  }, 0);
};

export const run = async (list: string[]) => {
  const games = list.map(parseGame);
  return games
    .map(winnings)
    .map((wins) => {
      if (wins) {
        return 2 ** (wins - 1);
      }
      return 0;
    })
    .reduce(sum, 0);
};

export const run2 = async (games: string[]) => {
  const parsedGames = games.map(parseGame);

  let gameList = parsedGames.map((game) => ({
    id: game.id,
    wins: winnings(game),
  }));

  let index = 0;
  while (index < gameList.length) {
    for (let i = 0; i < gameList[index].wins; i++) {
      const gameId = gameList[index].id + i + 1;
      gameList.push({ id: gameId, wins: gameList[gameId - 1].wins });
    }
    index++;
  }

  return gameList.length;
};
