import React from "react";
import Grid from "../Grid/Grid";
import Controls from "../Controls/Controls";
import Output from "../Output/Output";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

export function Game() {
  return (
    <div>
      <h1>Toy Robot Game</h1>
      <StyledDiv>
        <div>
          <Grid />
          <Output />
        </div>
        <Controls />
      </StyledDiv>
    </div>
  );
}
