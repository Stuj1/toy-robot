export const NORTH = "NORTH";
export const EAST = "EAST";
export const SOUTH = "SOUTH";
export const WEST = "WEST";
export const DIRECTIONS = [NORTH, EAST, SOUTH, WEST] as const;
export type TFacing = (typeof DIRECTIONS)[number];
// export type TFacing = TNorth | TEast | TSouth | TWest;

export type TActionPlaceRobot = "PLACE_ROBOT";
export type TActionPlaceWall = "PLACE_WALL";
export type TActionMove = "MOVE";
export type TActionLeft = "LEFT";
export type TActionRight = "RIGHT";
export type TActionReport = "REPORT";
export type TActionType =
  | TActionMove
  | TActionPlaceRobot
  | TActionPlaceWall
  | TActionLeft
  | TActionRight
  | TActionReport;

export type TInstruction = `${TActionType}`;

export interface IRobot {
  row: number;
  col: number;
  facing: TFacing;
}

export interface ICell {
  row: number;
  col: number;
  type: string | null;
}

export type TCell = "-" | "X" | "N" | "E" | "S" | "W";
