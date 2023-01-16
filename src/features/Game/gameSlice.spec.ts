import gameReducer, { GameState, placeRobot, placeWall } from "./gameSlice";
import { _, N, X } from "../../types";

describe("Game reducer", () => {
  const initialState: GameState = {
    grid: [
      [_, _, _, _, _],
      [_, _, _, _, _],
      [_, _, _, _, _],
      [_, _, _, _, _],
      [_, _, _, _, _],
    ],
    robot: null,
    output: "",
  };
  it("should handle initial state", () => {
    expect(gameReducer(undefined, { type: "unknown" })).toEqual({
      grid: [
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, _, _, _, _],
        [_, _, _, _, _],
      ],
      robot: null,
      output: "",
    });
  });

  describe("Direct commands", () => {
    describe("placeRobot", () => {
      it("should handle placing robot at 1,1", () => {
        const actual = gameReducer(
          initialState,
          placeRobot({ row: 1, col: 1, facing: "N" })
        );
        expect(actual.robot?.row).toEqual(1);
        expect(actual.robot?.col).toEqual(1);
        expect(actual.grid).toEqual([
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [N, _, _, _, _],
        ]);
      });

      it("should handle placing robot at 2,2", () => {
        const actual = gameReducer(
          initialState,
          placeRobot({ row: 2, col: 2, facing: "N" })
        );
        expect(actual.robot?.row).toEqual(2);
        expect(actual.robot?.col).toEqual(2);
        expect(actual.grid).toEqual([
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, N, _, _, _],
          [_, _, _, _, _],
        ]);
      });
    });

    describe("placeWall", () => {
      it("should handle placing wall at 1,1", () => {
        const actual = gameReducer(initialState, placeWall({ row: 1, col: 1 }));
        expect(actual.grid).toEqual([
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [X, _, _, _, _],
        ]);
      });

      it("should handle placing wall at 2,2", () => {
        const actual = gameReducer(initialState, placeWall({ row: 2, col: 2 }));
        expect(actual.grid).toEqual([
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, _, _, _, _],
          [_, X, _, _, _],
          [_, _, _, _, _],
        ]);
      });
    });
  });
});
