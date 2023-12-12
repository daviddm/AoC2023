import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { getPossibleSolutions, parseLine, run, run2 } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];
  let testListParsed: [string, number[]][];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
    testListParsed = testList.map(parseLine);
  });

  describe("test", () => {
    it("run1", async () => {
      const result = await getPossibleSolutions(...testListParsed[0]);
      expect(result).toEqual(1);
    });
    it("run2", async () => {
      const result = await getPossibleSolutions(...testListParsed[1]);
      expect(result).toEqual(4);
    });
    it("run3", async () => {
      const result = await run(testList);
      expect(result).toEqual(21);
    });
    it("run4", async () => {
      const result = await run2([testList[0]]);
      expect(result).toEqual(1);
    });
    it("run5", async () => {
      const result = await run2([testList[3]]);
      expect(result).toEqual(16);
    });
    it.skip("run6", async () => {
      const result = await run2(testList);
      expect(result).toEqual(525152);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(7490);
    });
  });

  describe.skip("second", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(undefined);
    });
  });
});
