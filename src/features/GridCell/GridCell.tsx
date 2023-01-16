import React, { FC } from "react";
import styled from "styled-components";
import "./GridCell.css";
import { TChar } from "../../types";

const StyledCell = styled.td`
  height: 25px;
  width: 25px;
`;

interface IGridCellProps {
  type: TChar;
}
const GridCell: FC<IGridCellProps> = ({ type }) => {
  return <StyledCell className={`cell cell-${type}`} />;
};
export default GridCell;
