import {
  IPlaceRobotValue, IPlaceWallValue,
  leftRobot,
  moveRobot,
  placeRobot,
  placeWall,
  rightRobot,
  report
} from "../features/game/gameSlice";
import { Action, Dispatch } from "@reduxjs/toolkit";
import { LEFT, MOVE, PLACE_ROBOT, PLACE_WALL, REPORT, RIGHT, TFACING } from "../types";

/**
 * Translates text instructions to reducer actions
 * @param instructions
 */
export function translateInstructionsToActions(instructions: string) {
  const lines = instructions.replace(/\r\n/g,"\n").split("\n");

  return lines.map((line: string) => {
    // Get parts of the instruction
    const [action, args] = line.split(" ");

    // Lookup correct action
    if (action === MOVE) return moveRobot();
    if (action === LEFT) return leftRobot();
    if (action === RIGHT) return rightRobot();
    if (action === REPORT) return report();
    if (action === PLACE_ROBOT) {
      const [iRow, iCol, iFacing] = args.split(",");
      const pv: IPlaceRobotValue = {row: Number(iRow), col: Number(iCol), facing: iFacing.charAt(0) as TFACING};
      return placeRobot(pv)
    }
    if (action === PLACE_WALL) {
      const [iRow, iCol] = args.split(",");
      const pv: IPlaceWallValue = {row: Number(iRow), col: Number(iCol)};
      return placeWall(pv)
    }

    // Default just report
    return report();
  });
}

/**
 * Executes provided actions in sequence using displatch
 * @param actions
 * @param dispatch
 * @param delay
 */
export function executeActionsInSequence(actions: Action[], dispatch: Dispatch, delay: number = 500) {
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
