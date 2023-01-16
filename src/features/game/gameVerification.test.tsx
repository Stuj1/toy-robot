import React from "react";
import { Game } from "./Game";
import gameReducer from "./gameSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen, fireEvent, act } from "@testing-library/react";

// setup the store
const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

jest.useFakeTimers();

function testSequence(testData: string, expected: string) {
  render(
    <Provider store={store}>
      <Game />
    </Provider>
  );

  // Get sequence commands element
  const seqInput = screen.getByLabelText(
    "Sequence commands"
  ) as HTMLTextAreaElement;

  // Set value to test data
  fireEvent.change(seqInput, { target: { value: testData } });
  expect(seqInput.value).toBe(testData);

  // Click GO button to start sequence
  expect(screen.getByText(/GO/i)).toHaveTextContent("GO");
  fireEvent.click(screen.getByText(/GO/i));

  // Advance timers to the sequence can complete
  act(() => jest.runAllTimers());

  // Check print output
  expect(screen.getByTestId("print-output")).toHaveTextContent(expected);
}
describe("Runs sequences", () => {
  it("Test Sequence 1", async () => {
    const testData = `PLACE_ROBOT 3,3,NORTH
PLACE_WALL 3,5
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT`;

    testSequence(testData, "5,5,EAST");
  });

  it("Test Sequence 2", async () => {
    const testData = `PLACE_ROBOT 2,2,WEST
PLACE_WALL 1,1
PLACE_WALL 2,2
PLACE_WALL 1,3
LEFT
LEFT
MOVE
REPORT`;

    testSequence(testData, "2,3,EAST");
  });
});
