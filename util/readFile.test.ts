import { readFile } from "./readFile";

describe("readFile", () => {
  it("should return buffer", async () => {
    expect.assertions(1);
    const result = await readFile("./util/test.txt");
    expect(result).toEqual(["1", "two", "3"]);
  });
});
