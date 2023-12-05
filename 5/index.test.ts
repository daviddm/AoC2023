import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { run } from "./";

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
      expect(result).toEqual(35);
    });
  });
  
  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(31599214);
    });
  });
  
  describe("second", () => {
    it.only("run", async () => {
      const result = await run(testList, true);
      expect(result).toEqual(46);
    });
    it("run", async () => {
      // 198 sec
      const result = await run(list, true);
      expect(result).toEqual(20358599);
    });
  });
});
