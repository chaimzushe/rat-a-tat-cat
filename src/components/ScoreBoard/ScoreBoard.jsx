import React from "react";
import "./ScoreBoard.scss";

export const ScoreBoard = (props) => {
  return (
    <>
      <ul className="scores">
        <li className={props.human > props.computer ? "score winner" : "score"}>
          computer: {props.computer}
        </li>
        <li className={props.human < props.computer ? "score winner" : "score"}>
          human: {props.human}
        </li>
      </ul>
      <button onClick={props.startGame} className="new-game">
        New Game
      </button>
    </>
  );
};
