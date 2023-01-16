import {
  leftRobot,
  moveRobot,
  placeRobot,
  placeWall,
  rightRobot,
  report,
  gameSlice,
} from "../features/Game/gameSlice";
import { Action, Dispatch } from "@reduxjs/toolkit";
import {
  FACINGFULL,
  FACINGSHORT,
  IPlaceRobotValue,
  IPlaceWallValue,
  LEFT,
  MOVE,
  PLACE_ROBOT,
  PLACE_WALL,
  REPORT,
  RIGHT,
} from "../types";

/**
 * Translates text instructions to reducer actions
 * @param instructions
 */
export function translateInstructionsToActions(instructions: string): Action[] {
  const lines = instructions.replace(/\r\n/g, "\n").split("\n");

  const actions: (Action | undefined)[] = lines.map(
    (line: string): Action | undefined => {
      // Get parts of the instruction
      const [action, args] = line.split(" ");

      // Lookup correct action
      if (action === MOVE) return moveRobot();
      if (action === LEFT) return leftRobot();
      if (action === RIGHT) return rightRobot();
      if (action === REPORT) return report();
      if (action === PLACE_ROBOT) {
        const row = Number(args.split(",")[0]);
        const col = Number(args.split(",")[1]);
        const facingString = args.split(",")[2];

        if (
          !isNaN(row) &&
          !isNaN(col) &&
          isCellInRange(row, col) &&
          FACINGFULL.includes(facingString)
        ) {
          const pv: IPlaceRobotValue = {
            row,
            col,
            facing: FACINGSHORT[FACINGFULL.indexOf(facingString)],
          };
          return placeRobot(pv);
        }
      }
      if (action === PLACE_WALL) {
        const row = Number(args.split(",")[0]);
        const col = Number(args.split(",")[1]);
        if (!isNaN(row) && !isNaN(col) && isCellInRange(row, col)) {
          const pv: IPlaceWallValue = { row, col };
          return placeWall(pv);
        }
      }
    }
  );

  return actions.filter((action) => !!action) as Action[];
}

/**
 * Executes provided actions in sequence using displatch
 * @param actions
 * @param dispatch
 * @param delay
 */
export function executeActionsInSequence(
  actions: Action[],
  dispatch: Dispatch,
  delay: number = 500
) {
  let i = 0;
  function next() {
    if (i < actions.length) {
      dispatch(actions[i]);
      i++;
      setTimeout(next, delay);
    }
  }
  next();
}

export function isCellInRange(row: number, col: number) {
  return row >= 1 && row <= 5 && col >= 1 && col <= 5;
}
