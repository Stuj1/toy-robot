import React, { useEffect, useState } from "react";

import { Board } from "../Board/Board";
import { Controls } from "../Controls/Controls";
import {
  EAST,
  ICell,
  IRobot,
  NORTH,
  SOUTH,
  TCell,
  TFacing,
  WEST,
} from "../../types";
import { calculateRowIndex } from "../../services/calculateRowIndex";

const Game = () => {
  const [robot, setRobot] = useState<IRobot | null>(null);
  const [grid, setGrid] = useState([
    "-----",
    "-----",
    "-----",
    "-----",
    "-----",
  ]);

  function init() {
    setGrid(["-----", "-----", "-----", "-----", "-----"]);
    setRobot(null);
  }

  function updateCell(row: number, col: number, type: string) {
    console.log("UPDATE CELL:", row, col, type);
    const newGrid = grid;
    let rowString: string = newGrid[calculateRowIndex(row)];
    newGrid[calculateRowIndex(row)] =
      rowString.substring(0, col - 1) + type + rowString.substring(col);
    setGrid(newGrid);
    console.log(newGrid);
  }

  function readInstruction(line: string) {
    const [action, args] = line.split(" ");

    if (action === "PLACE_ROBOT") {
      const [row, col, facing] = args.split(",");

      setRobot({
        row: parseInt(row),
        col: parseInt(col),
        facing: facing as TFacing,
      });

      updateCell(parseInt(row), parseInt(col), facing.charAt(0) as TCell);
      console.log("PLACE_ROBOT", row, col);
      return;
    }

    if (action === "PLACE_WALL") {
      const [row, col] = args.split(",");
      updateCell(parseInt(row), parseInt(col), "X");
      console.log("PLACE_WALL", row, col);
      return;
    }

    if (action === "REPORT" && robot) {
      console.warn(robot.row, robot.col, robot.facing);
      return;
    }

    if (action === "LEFT" && robot) {
      console.warn(robot.row, robot.col, robot.facing);
      return;
    }

    if (action === "MOVE" && robot) {
      console.log("MOVE");

      let newRow = robot.row;
      let newCol = robot.col;

      switch (robot.facing) {
        case NORTH:
          if (robot.row < 5) newRow++;
          break;
        case EAST:
          if (robot.col < 5) newCol++;
          break;
        case SOUTH:
          if (robot.col > 1) newRow--;
          break;
        case WEST:
          if (robot.col > 1) newCol--;
          break;
      }

      const targetPosition = grid[calculateRowIndex(newRow)][newCol - 1];

      console.log(targetPosition);

      if (targetPosition !== "X") {
        updateCell(robot.row, robot.col, "-");
        updateCell(newRow, newCol, robot.facing.charAt(0) as TCell);
        setRobot({
          row: newRow,
          col: newCol,
          facing: robot.facing as TFacing,
        });
      }
      return;
    }
  }
  function actionHandler(actions: string[]) {
    console.clear();
    init();
    console.log("start");

    let i = 0;
    function myLoop() {
      setTimeout(function () {
        readInstruction(actions[i]);

        i++;
        if (i < actions.length) myLoop();
      }, 1000);
    }
    myLoop();
    console.log("end");
  }

  useEffect(() => {}, [grid, robot]);
  return (
    <div className="game">
      <h1>Toy Robot</h1>
      <Controls actionCallback={actionHandler} />
      <Board grid={grid} robot={robot} />
      <code>{JSON.stringify(grid)}</code>
    </div>
  );
};

export default Game;
