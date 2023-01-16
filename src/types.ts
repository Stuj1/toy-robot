export const NORTH = "NORTH";
export const EAST = "EAST";
export const SOUTH = "SOUTH";
export const WEST = "WEST";
export const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

export const N = "N";
export const E = "E";
export const S = "S";
export const W = "W";
export const _ = "_";
export const X = "X";

export const FACING = [N, E, S, W] as const;
export const VALUES = [_, X, N, E, S, W] as const;
export type TFACING = (typeof FACING)[number];
export type TValues = (typeof VALUES)[number];
export type TCHAR = TValues;

export const MOVE = "MOVE";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const REPORT = "REPORT";
export const PLACE_WALL = "PLACE_WALL";
export const PLACE_ROBOT = "PLACE_ROBOT";

