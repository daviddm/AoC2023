import { stringToNumber } from "./stringToNumber";

describe("stringToNumber", () => {
  it("should parse array", async () => {
    expect.assertions(1);
    const result = stringToNumber(["1", "2"]);
    expect(result).toEqual([1, 2]);
  });
});
