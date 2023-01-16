import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOutput } from "../game/gameSlice";

const Output: FC = () => {
  const output = useAppSelector(selectOutput);

  return (
    <div>
      <label>Output:</label>
      <div data-testid="print-output">{output}</div>
    </div>
  );
};

export default Output;
