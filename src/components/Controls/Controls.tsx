import React, { useState } from "react";
import styles from "./Controls.module.css";
import "./Controls.scss";
import {
  N,
  FACINGSHORT,
  FACINGFULL,
  IPlaceWallValue,
  IPlaceRobotValue,
} from "../../types";
import {
  leftRobot,
  moveRobot,
  placeRobot,
  placeWall,
  report,
  reset,
  rightRobot,
} from "../Game/gameSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  executeActionsInSequence,
  translateInstructionsToActions,
} from "../../services/services";

const Controls = () => {
  const dispatch = useAppDispatch();
  const [wall, setWall] = useState<IPlaceWallValue>({ row: 1, col: 1 });
  const [robot, setRobot] = useState<IPlaceRobotValue>({
    row: 1,
    col: 1,
    facing: N,
  });

  const defaultSequence = `PLACE_ROBOT 2,2,WEST
PLACE_WALL 1,1
PLACE_WALL 2,2
PLACE_WALL 1,3
LEFT
LEFT
MOVE
REPORT`;
  const [sequence, setSequence] = useState(defaultSequence);

  function runSequence() {
    const actions = translateInstructionsToActions(sequence);
    executeActionsInSequence(actions, dispatch);
  }

  function handleToggleFacing() {
    const index = FACINGSHORT.indexOf(robot.facing);
    const newIndex = index < FACINGSHORT.length - 1 ? index + 1 : 0;
    setRobot({
      ...robot,
      facing: FACINGSHORT[newIndex],
    });
  }

  const toggleFacingDisplay = FACINGFULL[FACINGSHORT.indexOf(robot.facing)];

  return (
    <div className="controls">
      <div className={styles.row}>
        <div className={styles.buttonGroupWrapper}>
          <input
            className={styles.textbox}
            aria-label="Set row"
            value={robot?.row}
            onChange={(e) =>
              setRobot({
                ...robot,
                row: Number(e.target.value),
              })
            }
          />
          <input
            className={styles.textbox}
            aria-label="Set col"
            value={robot?.col}
            onChange={(e) =>
              setRobot({
                ...robot,
                col: Number(e.target.value),
              })
            }
          />
          <button className={styles.button} onClick={handleToggleFacing}>
            {toggleFacingDisplay}
          </button>
          <button
            className={styles.primaryButton}
            onClick={() => dispatch(placeRobot(robot))}
          >
            PLACE ROBOT
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.buttonGroupWrapper}>
          <input
            className={styles.textbox}
            aria-label="Set wall row"
            value={wall.row}
            onChange={(e) => setWall({ ...wall, row: Number(e.target.value) })}
          />
          <input
            className={styles.textbox}
            aria-label="Set wall col"
            value={wall.col}
            onChange={(e) => setWall({ ...wall, col: Number(e.target.value) })}
          />
          <button
            className={styles.primaryButton}
            onClick={() => dispatch(placeWall(wall))}
          >
            PLACE WALL
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(leftRobot())}>
          LEFT
        </button>
        <button className={styles.button} onClick={() => dispatch(moveRobot())}>
          MOVE
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(rightRobot())}
        >
          RIGHT
        </button>
        <button className={styles.button} onClick={() => dispatch(report())}>
          REPORT
        </button>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="sequence-commands" className={styles.label}>
            Sequence commands
          </label>
        </div>
        <div className={styles.row}>
          <textarea
            id="sequence-commands"
            data-testid="sequence-commands"
            cols={20}
            rows={10}
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <button className={styles.primaryButton} onClick={runSequence}>
            GO
          </button>
          <button className={styles.button} onClick={() => dispatch(reset())}>
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
