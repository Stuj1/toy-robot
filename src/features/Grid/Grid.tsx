import React, { FC } from 'react';
import { useAppSelector } from "../../app/hooks";
import {
  selectGrid,
} from '../game/gameSlice';
import GridCell from "../GridCell/GridCell";
import {TCHAR} from "../../types";

const Grid: FC = () => {
  const grid = useAppSelector(selectGrid);

  return (
    <div>
      <table cellSpacing={0}>
        <tbody>
          {grid.map((rowArray: TCHAR[], rIndex: number) => {
            return (
              <tr key={`row-${rIndex}`}>
                {rowArray.map((cell: TCHAR, cIndex: number) => {
                  return (
                    <GridCell key={`cell-${rIndex}-${cIndex}`} type={cell} />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Grid;
