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
      expect(result).toEqual(13);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(21568);
    });
  });

  describe("second", () => {
    it("run", async () => {
      const result = await run2(testList);
      expect(result).toEqual(30);
    });
    it("run", async () => {
      const result = await run2(list);
      expect(result).toEqual(11827296);
    });
  });
});
