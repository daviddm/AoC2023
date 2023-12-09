import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { run } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];
  let test2List: string[];
  let test3List: string[];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
    test2List = await readFile(`${__dirname}/test2.txt`);
    test3List = await readFile(`${__dirname}/test3.txt`);
  });

  describe("test", () => {
    it("run", async () => {
      const result = await run(testList);
      expect(result).toEqual(2);
    });
    it("run", async () => {
      const result = await run(test2List);
      expect(result).toEqual(6);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(15871);
    });
  });

  describe("second", () => {
    it("test", async () => {
      const result = await run(test3List, true);
      expect(result).toEqual(6);
    });
    it("run", async () => {
      const result = await run(list, true);
      expect(result).toEqual(11283670395017);
    });
  });
});
