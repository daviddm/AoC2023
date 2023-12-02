import { readFile } from "@util/readFile";
import {
  Game,
  Restriction,
  isGamePossible,
  leastCubes,
  parseGame,
  run,
  run2,
} from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];
  let restriction: Restriction;

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
    restriction = {
      blue: 14,
      green: 13,
      red: 12,
    };
  });

  describe("test", () => {
    it("isGamePossible 1", async () => {
      expect.assertions(1);
      const game: Game = {
        id: 1,
        restriction,
        reveals: [
          { blue: 3, green: 0, red: 4 },
          { blue: 0, green: 2, red: 1 },
          { blue: 6, green: 2, red: 0 },
        ],
      };
      const result = await isGamePossible(game);
      expect(result).toBeTruthy();
    });
    it("parseGame 1", async () => {
      const game: Omit<Game, "restriction"> = {
        id: 1,
        reveals: [
          { blue: 3, green: 0, red: 4 },
          { blue: 6, green: 2, red: 1 },
          { blue: 0, green: 2, red: 0 },
        ],
      };
      const result = await parseGame(
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
      );
      expect(result).toMatchObject(game);
    });
    it("isGamePossible 3", async () => {
      const game: Game = {
        id: 3,
        restriction,
        reveals: [
          { blue: 6, green: 8, red: 20 },
          { blue: 5, green: 13, red: 4 },
          { blue: 0, green: 5, red: 1 },
        ],
      };
      const result = await isGamePossible(game);
      expect(result).toBeFalsy();
    });
    it("run", async () => {
      const result = await run(testList, restriction);
      expect(result).toEqual(8);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list, restriction);
      expect(result).toEqual(2164);
    });
  });

  describe("second", () => {
    it("run2 1", async () => {
      const reveals = [
        { blue: 3, green: 0, red: 4 },
        { blue: 6, green: 2, red: 1 },
        { blue: 0, green: 2, red: 0 },
      ];
      const result = await leastCubes(reveals);
      expect(result).toMatchObject({
        red: 4,
        green: 2,
        blue: 6,
      });
    });
    it("run test", async () => {
      const result = await run2(testList);
      expect(result).toEqual(2286);
    });
    it("run", async () => {
      const result = await run2(list);
      expect(result).toEqual(69929);
    });
  });
});
