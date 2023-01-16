import React, { FC } from "react";
import { TCell, IRobot } from "../../types";
import BoardCell from "../BoardCell/BoardCell";

interface IBoardProps {
  robot: IRobot | null;
  grid: any;
}

export const Board: FC<IBoardProps> = ({ robot, grid }) => {
  return (
    <div>
      <h2>Board</h2>
      <table cellSpacing={0}>
        <tbody>
          {grid.map((rowString: string, rIndex: number) => {
            console.log(rowString);
            return (
              <tr key={`row-${rIndex}`}>
                {rowString.split("").map((cell: string, cIndex: number) => {
                  return (
                    <BoardCell key={`cell-${rIndex}-${cIndex}`} type={cell} />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
