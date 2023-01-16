import gameReducer, {
  GameState,
  placeRobot,
  placeWall,
} from './gameSlice';
import {_, N, X} from "../../types";

describe('game reducer', () => {
  const initialState: GameState = {
    grid: [
      [_,_,_,_,_,],
      [_,_,_,_,_,],
      [_,_,_,_,_,],
      [_,_,_,_,_,],
      [_,_,_,_,_,],
    ],
    robot: null,
    output: "",
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      grid: [
        [_,_,_,_,_,],
        [_,_,_,_,_,],
        [_,_,_,_,_,],
        [_,_,_,_,_,],
        [_,_,_,_,_,],
      ],
      robot: null,
      output: "",
      status: 'idle',
    });
  });


  describe('Direct commands', () => {
    describe('placeRobot', () => {
      it('should handle placing robot at 1,1', () => {
        const actual = gameReducer(initialState, placeRobot({row: 1, col: 1, facing: "N"}));
        expect(actual.robot?.row).toEqual(1);
        expect(actual.robot?.col).toEqual(1);
        expect(actual.grid).toEqual([
          [_, _, _, _, _,],
          [_, _, _, _, _,],
          [_, _, _, _, _,],
          [_, _, _, _, _,],
          [N, _, _, _, _,],
        ]);
      });

      it('should handle placing robot at 2,2', () => {
        const actual = gameReducer(initialState, placeRobot({row: 2, col: 2, facing: "N"}));
        expect(actual.robot?.row).toEqual(2);
        expect(actual.robot?.col).toEqual(2);
        expect(actual.grid).toEqual([
          [_, _, _, _, _,],
          [_, _, _, _, _,],
          [_, _, _, _, _,],
          [_, N, _, _, _,],
          [_, _, _, _, _,],
        ]);
      });
    });

    describe('placeWall', () => {
      it('should handle placing wall at 1,1', () => {
        const actual = gameReducer(initialState, placeWall({row: 1, col: 1}));
        expect(actual.grid).toEqual([
          [_,_,_,_,_,],
          [_,_,_,_,_,],
          [_,_,_,_,_,],
          [_,_,_,_,_,],
          [X,_,_,_,_,],
        ]);
      });

      it('should handle placing wall at 2,2', () => {
        const actual = gameReducer(initialState, placeWall({row: 2, col: 2}));
        expect(actual.grid).toEqual([
          [_,_,_,_,_,],
          [_,_,_,_,_,],
          [_,_,_,_,_,],
          [_,X,_,_,_,],
          [_,_,_,_,_,],
        ]);
      });
    });

    // describe('move', () => {
    //   it('should handle move N', () => {
    //     const actual = gameReducer(initialState, placeRobot({row: 2, col: 2, facing: "N"}));
    //     expect(actual.robot?.row).toEqual(2);
    //     expect(actual.robot?.col).toEqual(2);
    //     // const actual = gameReducer(initialState, moveRobot());
    //     expect(actual.grid).toEqual([
    //       [_,_,_,_,_,],
    //       [_,_,_,_,_,],
    //       [_,_,_,_,_,],
    //       [N,_,_,_,_,],
    //       [_,_,_,_,_,],
    //     ]);
    //   });
    // });

    // describe('Sequences', () => {
    //   it('TEST 1 should print "1,4,EAST"', () => {
    //     const testData = `
    //     PLACE_ROBOT 3,3,
    //     NORTH PLACE_WALL 3,5
    //     MOVE
    //     MOVE
    //     RIGHT
    //     MOVE
    //     MOVE
    //     MOVE
    //     REPORT`;
    //
    //     const actual = gameReducer(initialState);
    //
    //   });
    // });
  });

  // it('should handle decrement', () => {
  //   const actual = gameReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });
  //
  // it('should handle incrementByAmount', () => {
  //   const actual = gameReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });

});
