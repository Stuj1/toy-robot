export const NORTH = "NORTH";
export const EAST = "EAST";
export const SOUTH = "SOUTH";
export const WEST = "WEST";
export const FACINGFULL = [NORTH, EAST, SOUTH, WEST];
export type TFacingFull = (typeof FACINGFULL)[number];

export const N = "N";
export const E = "E";
export const S = "S";
export const W = "W";
export const _ = "_"; // Blank
export const X = "X"; // Wall

export const FACINGSHORT = [N, E, S, W] as const;
export const VALUES = [...FACINGSHORT, _, X] as const;
export type TFacingShort = (typeof FACINGSHORT)[number];
export type TChar = (typeof VALUES)[number];

export const MOVE = "MOVE";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const REPORT = "REPORT";
export const PLACE_WALL = "PLACE_WALL";
export const PLACE_ROBOT = "PLACE_ROBOT";
