import React, { FC } from "react";
import "./GridCell.scss";
import { TChar } from "../../types";

interface IGridCellProps {
  type: TChar;
}
const GridCell: FC<IGridCellProps> = ({ type }) => {
  return <td className={`cell cell-${type}`} />;
};
export default GridCell;
