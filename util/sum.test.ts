import { sum } from "./sum";

describe("sum", () => {
  let list: number[];
  beforeEach(async () => {
    list = [1, 2, 3];
  });

  it("should return 6", async () => {
    expect.assertions(1);
    const result = list.reduce(sum, 0);
    expect(result).toBe(6);
  });
});
