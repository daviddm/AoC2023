import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { numberFinder, run, run2 } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
  });

  describe("test", () => {
    it("run", async () => {
      expect.assertions(1);
      const result = await run(testList);
      expect(result).toEqual(142);
    });
  });

  describe("first", () => {
    it("run", async () => {
      expect.assertions(1);
      const result = await run(list);
      expect(result).toEqual(54081);
    });
  });

  describe("second", () => {
    let testList2: string[];
    beforeAll(async () => {
      testList2 = await readFile(`${__dirname}/test2.txt`);
    });
    it("test", async () => {
      expect.assertions(1);
      const result: any = numberFinder("7", 0, "7pqrstsixteen");
      expect(result).toEqual(7);
    });
    it("test", async () => {
      expect.assertions(1);
      const result: any = await run2(testList2);
      expect(result).toEqual(281);
    });
    it("run", async () => {
      expect.assertions(1);
      const result = await run2(list);
      expect(result).toEqual(54649);
    });
  });
});
