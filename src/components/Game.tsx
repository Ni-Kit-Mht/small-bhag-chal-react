import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import necessary hooks
import { GameBoard } from './GameBoard';
import SVGComponent from './SVGComponent';
import { useGameContext } from "../context/GameContext"; // Import GameContext


const connections = [
  [16, 56], [56, 64], [64, 16],
  [36, 40], [16, 38], [60, 93],
  [89, 97],
];

const gridSize = 11; // 11x11 grid

export const Game = () => {
  const { setBoardState } = useGameContext(); // Access board state and updater
  const location = useLocation(); // Access the location state

  // Function to reset the game state
  const resetGame = () => {
    // Reset the boardState to its initial values
    const initialBoardState: Record<string, string> = {
      "5.1": "bhag",   // Add 'bhag' at 5.1
      "1.8": "bhakra",  // Add 'bhakra' at 1.8
      "5.8": "bhakra",  // Add 'bhakra' at 5.8
      "9.8": "bhakra",  // Add 'bhakra' at 9.8
    };

    // Update the state with the initial board state
    setBoardState(initialBoardState);
  };

  // Check if it's a new game on component mount and reset game if true
  useEffect(() => {
    if (location.state?.isNewGame) {
      resetGame();
    }
  }, [location.state?.isNewGame]); // Dependency on the isNewGame state
  const goBack = () => {
//    document.body.innerHTML = '';
    window.history.back();
  };
  return (
    <div className="game-container" id = "game-container">
      <div className="game-board-wrapper">
        <GameBoard gridSize={gridSize} />
        <SVGComponent connections={connections} gridSize={gridSize} />
      </div>
      <div className="game-controls">        
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};
