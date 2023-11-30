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
      expect.assertions(1);
      const result = await run(testList);
      expect(result).toEqual(undefined);
    });
  });

  describe.skip("first", () => {
    it("run", async () => {
      expect.assertions(1);
      const result = await run(list);
      expect(result).toEqual(undefined);
    });
  });

  describe.skip("second", () => {
    it("run", async () => {
      expect.assertions(1);
      const result = await run(list);
      expect(result).toEqual(undefined);
    });
  });
});
