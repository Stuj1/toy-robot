import React, { FC } from "react";
import styled from "styled-components";
import { TCell } from "../../types";

interface IBoardCellProps {
  type: TCell | string;
}

const StyledCell = styled("td")`
  height: 70px;
  width: 70px;
  border: solid 1px grey;
`;

const BoardCell: FC<IBoardCellProps> = ({ type }) => {
  // function renderCell() {
  //   if (type === "N") {
  //     return <span>N</span>;
  //   }
  //
  //   if (type === "E") {
  //     return <span>E</span>;
  //   }
  //
  //   if (type === "S") {
  //     return <span>S</span>;
  //   }
  //
  //   if (type === "W") {
  //     return <span>W</span>;
  //   }
  //
  //   if (type === "X") {
  //     return <span>X</span>;
  //   }
  //
  //   return <span>-</span>;
  // }

  return <StyledCell>{type}</StyledCell>;
};

export default BoardCell;
