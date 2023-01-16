import { isCellInRange, translateInstructionsToActions } from "./services";
import { N } from "../types";

describe("translateInstructionsToActions", () => {
  test("Translates basic commands", () => {
    expect(translateInstructionsToActions("MOVE")).toEqual([
      {
        payload: undefined,
        type: "game/moveRobot",
      },
    ]);
    expect(translateInstructionsToActions("LEFT")).toEqual([
      {
        payload: undefined,
        type: "game/leftRobot",
      },
    ]);
    expect(translateInstructionsToActions("RIGHT")).toEqual([
      {
        payload: undefined,
        type: "game/rightRobot",
      },
    ]);
    expect(translateInstructionsToActions("REPORT")).toEqual([
      {
        payload: undefined,
        type: "game/report",
      },
    ]);
  });

  test("Translates multiple commands", () => {
    expect(translateInstructionsToActions("MOVE\nLEFT\nRIGHT\nREPORT")).toEqual(
      [
        {
          payload: undefined,
          type: "game/moveRobot",
        },
        {
          payload: undefined,
          type: "game/leftRobot",
        },
        {
          payload: undefined,
          type: "game/rightRobot",
        },
        {
          payload: undefined,
          type: "game/report",
        },
      ]
    );
  });

  test("Filters commands", () => {
    expect(
      translateInstructionsToActions("MOVE\nLEFT\nRIGHT\nWRONG\nREPORT")
    ).toEqual([
      {
        payload: undefined,
        type: "game/moveRobot",
      },
      {
        payload: undefined,
        type: "game/leftRobot",
      },
      {
        payload: undefined,
        type: "game/rightRobot",
      },
      {
        payload: undefined,
        type: "game/report",
      },
    ]);
  });

  test("Translates place wall commands", () => {
    const testData = "PLACE_WALL 1,1\nPLACE_WALL 5,5";
    expect(translateInstructionsToActions(testData)).toEqual([
      {
        payload: {
          row: 1,
          col: 1,
        },
        type: "game/placeWall",
      },
      {
        payload: {
          row: 5,
          col: 5,
        },
        type: "game/placeWall",
      },
    ]);
  });

  describe("PLACE_ROBOT commands", () => {
    test("This places a robot at row 2, column 3, facing North", () => {
      const testData = "PLACE_ROBOT 2,3,NORTH";
      expect(translateInstructionsToActions(testData)).toEqual([
        {
          payload: {
            row: 2,
            col: 3,
            facing: N,
          },
          type: "game/placeRobot",
        },
      ]);
    });
    test("This command is ignored because facing direction is invalid", () => {
      const testData = "PLACE_ROBOT 2,3,CENTER";
      expect(translateInstructionsToActions(testData)).toEqual([]);
    });
    test("This command is ignored because the COL coordinate is invalid", () => {
      const testData = "PLACE_ROBOT 2,6,EAST";
      expect(translateInstructionsToActions(testData)).toEqual([]);
    });
  });

  describe("PLACE_WALL commands", () => {
    test("This places a wall at row 2, column 3", () => {
      const testData = "PLACE_WALL 2,3";
      expect(translateInstructionsToActions(testData)).toEqual([
        {
          payload: {
            row: 2,
            col: 3,
          },
          type: "game/placeWall",
        },
      ]);
    });
    test("This command is ignored because the COL coordinate is invalid", () => {
      const testData = "PLACE_WALL 2,6";
      expect(translateInstructionsToActions(testData)).toEqual([]);
    });
  });
});

describe("isCellInRange", () => {
  test.each([
    [1, 1, true],
    [1, 5, true],
    [5, 1, true],
    [5, 5, true],
    [0, 1, false],
    [1, 6, false],
    [5, 0, false],
    [0, 5, false],
    [6, 1, false],
  ])("(%i, %i) is %i", (row, col, expected) => {
    expect(isCellInRange(row, col)).toBe(expected);
  });
});
