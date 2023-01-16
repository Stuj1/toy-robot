import { calculateRowIndex } from "./calculateRowIndex";

describe("calculateRowIndex test suite", () => {
  test.each([
    [5, 0],
    [4, 1],
    [3, 2],
    [2, 3],
    [1, 4],
  ])("Row %i gives index %i", (row, expected) => {
    expect(calculateRowIndex(row)).toBe(expected);
  });
});
