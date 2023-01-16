import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOutput } from "../Game/gameSlice";
import "./Output.scss";

const Output: FC = () => {
  const output = useAppSelector(selectOutput);

  return (
    <div className="output-panel">
      {output && (
        <>
          <span>Output:</span>
          <div data-testid="print-output">{output}</div>
        </>
      )}
    </div>
  );
};

export default Output;
