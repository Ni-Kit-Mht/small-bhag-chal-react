import React from "react";
import { GameBoard } from "./GameBoard";
import SVGComponent from "./SVGComponent";
import { useGameContext } from "../context/GameContext";

const connections = [
  [16, 56], [56, 64], [64, 16],
  [36, 40], [16, 38], [60, 93],
  [89, 97],
];

const gridSize = 11; // 11x11 grid

const GameContinue: React.FC = () => {
  const { boardState } = useGameContext(); // Access the board state
  const goBack = () => {
    //document.body.innerHTML = '';
    window.history.back();
  };
  return (
    <div className="game-container" id = "game-container">
      <div style={{ display: "none" }}>
        <h1>Continue Game</h1>
        <p>Current board state:</p>
        <ul>
          {Object.entries(boardState).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="game-board-wrapper">
        <GameBoard gridSize={gridSize} />
        <SVGComponent connections={connections} gridSize={gridSize} />
      </div>
      <button onClick={goBack}>Go Back</button>;
    </div>
  );
};

export default GameContinue;
