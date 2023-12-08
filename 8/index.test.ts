import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { run } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];
  let test2List: string[];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
    test2List = await readFile(`${__dirname}/test2.txt`);
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

  describe.skip("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(undefined);
    });
  });

  describe.skip("second", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(undefined);
    });
  });
});
