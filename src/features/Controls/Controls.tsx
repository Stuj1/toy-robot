import React, { useState } from 'react';
import styles from "./Controls.module.css";
import { N, E, S, W } from "../../types";
import {
  IPlaceRobotValue, IPlaceWallValue,
  leftRobot,
  moveRobot,
  placeRobot,
  placeWall,
  report,
  reset,
  rightRobot,
} from "../game/gameSlice";
import { useAppDispatch } from "../../app/hooks";
import { executeActionsInSequence, translateInstructionsToActions } from "../../services/services";

const Controls = () => {
  const dispatch = useAppDispatch();
  const [wall, setWall] = useState<IPlaceWallValue>({ row: 1, col: 1});
  const [robot, setRobot] = useState<IPlaceRobotValue>({ row: 1, col: 1, facing: N});

  const [list, setList] = useState("PLACE_ROBOT 2,3,NORTH");

  function runSequenceList() {
    dispatch(reset());
    const actions = translateInstructionsToActions(list);
    executeActionsInSequence(actions, dispatch);
  }

  return <div className={styles.controls}>
    <div className={styles.row}>
      <div className={styles.buttonGroupWrapper}>
        <button
          className={styles.button}
          onClick={() => dispatch(placeRobot(robot))}
        >
          PLACE_ROBOT
        </button>
        <input
          className={styles.textbox}
          aria-label="Set row"
          value={robot?.row}
          onChange={(e) => setRobot({
            ...robot,
            row: Number(e.target.value)
          })}
        />
        <input
          className={styles.textbox}
          aria-label="Set col"
          value={robot?.col}
          onChange={(e) => setRobot({
            ...robot,
            col: Number(e.target.value)
          })}
        />
        <button
          className={styles.button}
          onClick={() => setRobot({
            ...robot,
            facing:
              robot.facing === N ? E
              : robot.facing === E ? S
              : robot.facing === S ? W
              : N
          })}
        >
          {robot.facing}
        </button>
      </div>
    </div>

    <div className={styles.row}>
      <div className={styles.buttonGroupWrapper}>
        <button
          className={styles.button}
          onClick={() => dispatch(placeWall(wall))}
        >
          PLACE_WALL
        </button>
        <input
          className={styles.textbox}
          aria-label="Set wall row"
          value={wall.row}
          onChange={(e) => setWall({...wall, row: Number(e.target.value)})}
        />
        <input
          className={styles.textbox}
          aria-label="Set wall col"
          value={wall.col}
          onChange={(e) => setWall({...wall, col: Number(e.target.value)})}
        />
      </div>
    </div>

    <div className={styles.row}>
      <button
        className={styles.button}
        onClick={() => dispatch(leftRobot())}
      >
        LEFT
      </button>
      <button
        className={styles.button}
        onClick={() => dispatch(moveRobot())}
      >
        MOVE
      </button>
      <button
        className={styles.button}
        onClick={() => dispatch(rightRobot())}
      >
        RIGHT
      </button>
      <button
        className={styles.button}
        onClick={() => dispatch(report())}
      >
        REPORT
      </button>
    </div>

    <div>
      <div className={styles.row}>
        <label htmlFor="sequence-commands">Sequence commands</label>
      </div>
      <div className={styles.row}>
        <textarea id="sequence-commands" cols={20} rows={10} value={list} onChange={(e) => setList(e.target.value)} />
      </div>

      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={runSequenceList}
        >
          GO
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(reset())}
        >
          RESET
        </button>
      </div>
    </div>
  </div>
}

export default Controls;
