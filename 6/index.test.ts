import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { run, run2 } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
  });

  describe("test", () => {
    it("run", async () => {
      const result = await run(testList);
      expect(result).toEqual(288);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(625968);
    });
  });

  describe("second", () => {
    it("test", async () => {
      const result = await run2(testList);
      expect(result).toEqual(71503);
    });
    it("run", async () => {
      // 4134ms
      const result = await run2(list);
      expect(result).toEqual(43663323);
    });
  });
});
