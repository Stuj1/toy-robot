import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {_, X, N, E, S, W, TCHAR, TFACING} from "../../types";

export interface GameState {
  grid: TCHAR[][];
  robot: { row: number, col: number, facing: TFACING } | null;
  output: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GameState = {
  grid: [
    [_,_,_,_,_,],
    [_,_,_,_,_,],
    [_,_,_,_,_,],
    [_,_,_,_,_,],
    [_,_,_,_,_,],
  ],
  robot: null,
  output: "",
  status: 'idle',
};

export interface IPlaceRobotValue {
  row: number,
  col: number,
  facing: TFACING;
}
export interface IPlaceWallValue {
  row: number,
  col: number,
}

function isCellValid(row: number, col: number) {
  return row >= 1 && row <= 5 && col >= 1 && col <= 5;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      state.grid = initialState.grid;
      state.robot = initialState.robot;
      state.output = initialState.output;
    },
    placeRobot: (state, action: PayloadAction<IPlaceRobotValue>) => {
      const {row, col, facing} = action.payload;
      if (isCellValid(row, col)) {
        // Clear last position
        if (state.robot) {
          state.grid[5 - state.robot.row][state.robot.col - 1] = _;
        }

        // Set cell to robot
        state.grid[5 - row][col - 1] = facing;

        // Update robot position
        state.robot = {row, col, facing};
      }
    },
    placeWall: (state, action: PayloadAction<IPlaceWallValue>) => {
      const {row, col} = action.payload;
      if (isCellValid(row, col)) {
        // Check robot not in place
        if (state.robot && state.robot.row === row && state.robot.col === col) {
          return;
        }

        // Set cell to wall
        state.grid[5 - row][col - 1] = X;
      }
    },
    moveRobot: (state) => {
      if (state.robot) {
        let newRow = state.robot.row;
        let newCol = state.robot.col;

        switch (state.robot.facing) {
          case N:
            if (state.robot.row < 5) newRow++;
            break;
          case E:
            if (state.robot.col < 5) newCol++;
            break;
          case S:
            if (state.robot.row > 1) newRow--;
            break;
          case W:
            if (state.robot.col > 1) newCol--;
            break;
        }

        if (!isCellValid(newRow, newCol)) return;

        // Get target cell value
        const target = state.grid[5 - newRow][newCol - 1];

        if (target !== X) {
          // Clear previous robot
          state.grid[5 - state.robot.row][state.robot.col - 1] = _;

          // Draw new robot position
          state.grid[5 - newRow][newCol - 1] = state.robot.facing;

          // Update robot position
          state.robot = {
            ...state.robot,
            row: newRow,
            col: newCol
          };
        }

      }
    },
    leftRobot: (state) => {
      if (state.robot) {
        switch (state.robot.facing) {
          case N:
            state.robot.facing = W;
            break;
          case E:
            state.robot.facing = N;
            break;
          case S:
            state.robot.facing = E;
            break;
          case W:
            state.robot.facing = S;
            break;
        }
        state.grid[5 - state.robot.row][state.robot.col - 1] = state.robot.facing;
      }
    },
    rightRobot: (state) => {
      if (state.robot) {
        switch (state.robot.facing) {
          case N:
            state.robot.facing = E;
            break;
          case E:
            state.robot.facing = S;
            break;
          case S:
            state.robot.facing = W;
            break;
          case W:
            state.robot.facing = N;
            break;
        }
        state.grid[5 - state.robot.row][state.robot.col - 1] = state.robot.facing;
      }
    },
    report: (state) => {
      if (state.robot) {
        const { row, col, facing } = state.robot;
        const directions = {
          N: "NORTH",
          E: "EAST",
          S: "SOUTH",
          W: "WEST",
        };
        state.output = `${row},${col},${directions[facing]}`;
      }
    }
  },
});

export const { leftRobot, rightRobot, placeRobot, moveRobot, placeWall, report, reset } = gameSlice.actions;

// Get the grid from state
export const selectGrid = (state: RootState) => state.game.grid;
export const selectOutput = (state: RootState) => state.game.output;

export default gameSlice.reducer;
