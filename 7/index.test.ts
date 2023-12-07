import { readFile } from "@util/readFile";
import { stringToNumber } from "@util/stringToNumber";
import { getHandRank, run } from "./";

describe("today", () => {
  let list: string[];
  let testList: string[];

  beforeEach(async () => {
    list = await readFile(`${__dirname}/input.txt`);
    testList = await readFile(`${__dirname}/test.txt`);
  });

  describe("test", () => {
    describe("getHandRank", () => {
      it("5 of kind", async () => {
        const result = await getHandRank({ 14: 5 });
        expect(result).toEqual(7);
      });
      it("4 of kind, high", async () => {
        const result = await getHandRank({ 14: 4, 13: 1 });
        expect(result).toEqual(6);
      });
      it("4 of kind, low", async () => {
        const result = await getHandRank({ 14: 1, 13: 4 });
        expect(result).toEqual(6);
      });
      it("full house", async () => {
        const result = await getHandRank({ 14: 2, 13: 3 });
        expect(result).toEqual(5);
      });
      it("3 of a kind, high", async () => {
        const result = await getHandRank({ 14: 3, 13: 1, 12: 1 });
        expect(result).toEqual(4);
      });
      it("3 of a kind, mid", async () => {
        const result = await getHandRank({ 14: 1, 13: 3, 12: 1 });
        expect(result).toEqual(4);
      });
      it("3 of a kind, low", async () => {
        const result = await getHandRank({ 14: 1, 13: 1, 12: 3 });
        expect(result).toEqual(4);
      });
      it("2 pairs, high", async () => {
        const result = await getHandRank({ 14: 2, 13: 2, 12: 1 });
        expect(result).toEqual(3);
      });
      it("2 pairs, mid", async () => {
        const result = await getHandRank({ 14: 2, 13: 1, 12: 2 });
        expect(result).toEqual(3);
      });
      it("2 pairs, low", async () => {
        const result = await getHandRank({ 14: 1, 13: 2, 12: 2 });
        expect(result).toEqual(3);
      });
      it("1 pair, high", async () => {
        const result = await getHandRank({ 14: 2, 13: 1, 12: 1, 11: 1 });
        expect(result).toEqual(2);
      });
      it("1 pair, mid high", async () => {
        const result = await getHandRank({ 14: 1, 13: 2, 12: 1, 11: 1 });
        expect(result).toEqual(2);
      });
      it("1 pair, mid low", async () => {
        const result = await getHandRank({ 14: 1, 13: 1, 12: 2, 11: 1 });
        expect(result).toEqual(2);
      });
      it("1 pair, low", async () => {
        const result = await getHandRank({ 14: 1, 13: 1, 12: 1, 11: 2 });
        expect(result).toEqual(2);
      });
      it("high card", async () => {
        const result = await getHandRank({ 14: 1, 13: 1, 12: 1, 11: 1, 10: 1 });
        expect(result).toEqual(1);
      });
    });
    it("run", async () => {
      const result = await run(testList);
      expect(result).toEqual(6440);
    });
  });

  describe("first", () => {
    it("run", async () => {
      const result = await run(list);
      expect(result).toEqual(251287184);
    });
  });

  describe("second", () => {
    describe("getHandRank", () => {
      it("5 of kind", async () => {
        const result = await getHandRank({ 14: 4, 1: 1 });
        expect(result).toEqual(7);
      });
      it("5 of kind", async () => {
        const result = await getHandRank({ 1: 5 });
        expect(result).toEqual(7);
      });
      it("4 of kind", async () => {
        const result = await getHandRank({ 1: 3, 2: 1, 3: 1 });
        expect(result).toEqual(6);
      });
    });

    it("run made up", async () => {
      const result = await run(["QQQJA 10", "QQQQA 2"], true);
      expect(result).toEqual(14);
    });
    it("run test", async () => {
      const result = await run(testList, true);
      expect(result).toEqual(5905);
    });
    it("run", async () => {
      const result = await run(list, true);
      expect(result).toBe(250757288);
    });
  });
});
