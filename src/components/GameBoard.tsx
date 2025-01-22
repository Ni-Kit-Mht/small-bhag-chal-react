import { useState, useEffect } from 'react';
import { GridCell } from './GridCell';
import { useGameContext } from "../context/GameContext";


// Initial valid moves
const initialValidMoves: Record<string, string[]> = {
  "5.1": ["3.3", "5.3", "7.3"],
  "3.3": ["5.1", "5.3", "1.5"],
  "5.3": ["5.1", "3.3", "7.3"],
  "7.3": ["5.1", "5.3", "9.5"],
  "1.5": ["3.3", "5.5"],
  "9.5": ["7.3", "5.5"],
  "5.5": ["1.5", "9.5"],
  "1.8": ["5.8"],
  "5.8": ["1.8", "9.8", "5.5"],
  "9.8": ["5.8"]
};
const validMoves1 = ["5.1", "3.3", "7.3","5.3", "1.5", "9.5", "5.5", "1.8", "5.8", "9.8"];

const updateValidMoves = (
  bagh: string,
  bhakras: string | string[],  // Allow bhakras to be either a string or an array of strings
  validMoves: Record<string, string[]>
): Record<string, string[]> => {
  // Create a deep copy of the validMoves object
  const updatedMoves = JSON.parse(JSON.stringify(validMoves));

  // Ensure bhakras is an array
  const bhakrasArray = Array.isArray(bhakras) ? bhakras : [bhakras];

  // Define the conditions to update valid moves
  const conditions = [
    { bagh: "5.1", bhakra: "3.3", add: { fromPos: "5.1", toPos: "1.5" } },
    { bagh: "5.1", bhakra: "7.3", add: { fromPos: "5.1", toPos: "9.5" } },
    { bagh: "3.3", bhakra: "5.3", add: { fromPos: "3.3", toPos: "7.3" } },
    { bagh: "7.3", bhakra: "5.3", add: { fromPos: "7.3", toPos: "3.3" } },
    { bagh: "1.5", bhakra: "5.5", add: { fromPos: "1.5", toPos: "9.5" } },
    { bagh: "9.5", bhakra: "5.5", add: { fromPos: "9.5", toPos: "1.5" } },
    { bagh: "1.5", bhakra: "3.3", add: { fromPos: "1.5", toPos: "5.1" } },
    { bagh: "9.5", bhakra: "7.3", add: { fromPos: "9.5", toPos: "5.1" } }
  ];

  // Iterate over the conditions and update the validMoves
  conditions.forEach((condition) => {
    const { bagh: baghPos, bhakra: bhakraPos, add: { fromPos, toPos } } = condition;

    // Check if the bagh and bhakra positions match
    if (bagh === baghPos && bhakrasArray.includes(bhakraPos)) {
      // If the move is not already in the valid moves, add it
      if (!updatedMoves[fromPos].includes(toPos)) {
        updatedMoves[fromPos].push(toPos);
      }
    } else {
      // Explicitly type 'move' as string in the filter function
      updatedMoves[fromPos] = updatedMoves[fromPos].filter((move: string) => move !== toPos);
    }
  });

  return updatedMoves;
};



let allBhagPositions: string[] = []; // If it will store strings
let bhagPosition = "5.1";
let bhagPosition1 = bhagPosition;
allBhagPositions.push(bhagPosition)

function showGameOverMessage() {
  // Display a popup or alert
  //alert("Game Over!");
  allBhagPositions = []
  // Alternatively, update the UI with a game-over message
  const gameOverElement = document.createElement('div');
  gameOverElement.id = "game-over-message";
  gameOverElement.textContent = "Game Over! Bhag Wins.";
  gameOverElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-size: 24px;
      text-align: center;
      z-index: 1000;
  `;

  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.appendChild(gameOverElement);
  } else {
    console.error('Game container not found');
  }
  
}
function showGameOverMessage1() {
  // Display a popup or alert
  //alert("Game Over!");
  allBhagPositions = []
  // Alternatively, update the UI with a game-over message
  const gameOverElement = document.createElement('div');
  gameOverElement.id = "game-over-message";
  gameOverElement.textContent = "Game Over! Bhakra Wins.";
  gameOverElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-size: 24px;
      text-align: center;
      z-index: 1000;
  `;

  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.appendChild(gameOverElement);
  } else {
    console.error('Game container not found');
  }
  
}

function checkBaghPosition(bhagPositionchecker: string) {
  if (
    (bhagPosition1 === "5.1" && bhagPositionchecker === "9.5") ||
    (bhagPosition1 === "9.5" && bhagPositionchecker === "5.1")
  ) {
    removeAllEventListeners();
    showGameOverMessage();
  }
  if (
    (bhagPosition1 === "5.1" && bhagPositionchecker === "1.5") ||
    (bhagPosition1 === "1.5" && bhagPositionchecker === "5.1")
  ) {
    removeAllEventListeners();
    showGameOverMessage();
  }
  if (
    (bhagPosition1 === "3.3" && bhagPositionchecker === "7.3") ||
    (bhagPosition1 === "7.3" && bhagPositionchecker === "3.3")
  ) {
    removeAllEventListeners();
    showGameOverMessage();
  }
  if (
    (bhagPosition1 === "1.5" && bhagPositionchecker === "9.5") ||
    (bhagPosition1 === "9.5" && bhagPositionchecker === "1.5")
  ) {
    removeAllEventListeners();
    showGameOverMessage();
  }
}

function checkBhakraPosition(bhagPosition:string, bhakraPositions:string[]) {
// Check if `bhakraPositions` is an array and contains exactly 3 characters
if (Array.isArray(bhakraPositions) && bhakraPositions.length === 3) {
    // Scenario 1: bhakraPositions are "2.1", "2.3", "1" and bhagPosition is "2.2"
    if (bhakraPositions.includes("3.3") &&
        bhakraPositions.includes("7.3") &&
        bhakraPositions.includes("5.1") &&
        bhagPosition === "5.3") {

        removeAllEventListeners();
        showGameOverMessage1();
        return;
    }

    // Scenario 2: bhakraPositions are "3.1", "3.3" and any other, and bhagPosition is "3.2"
    if (bhakraPositions.includes("1.5") &&
        bhakraPositions.includes("9.5") &&
        bhakraPositions.some(pos => pos !== "1.5" && pos !== "9.5") &&
        bhagPosition === "5.5") {

        removeAllEventListeners();
        showGameOverMessage1();
        return;
    }
}
}

const removeAllEventListeners = () => {
  document.querySelectorAll(".grid-cell").forEach((cell) => {
    const newCell = cell.cloneNode(true) as HTMLElement;
    cell.parentNode?.replaceChild(newCell, cell);
  });
  console.log("All event listeners have been removed.");
};
let i = 0;
let bhakraSelected = false;
export const GameBoard = ({ gridSize }: { gridSize: number }) => {
  const [validMoves, setValidMoves] = useState<Record<string, string[]>>(initialValidMoves);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  let [positionOfBhag, setBhagPosition] = useState<string | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set()); // Track highlighted cells
  const { boardState, setBoardState } = useGameContext(); // Access board state
  // Gather all bhakra positions
  const bagh = Object.keys(boardState).find(key => boardState[key] === "bhag") || "";
  const bhakras = Object.keys(boardState).filter(key => boardState[key] === "bhakra");

  useEffect(() => {
    // Compute the updated valid moves
    const updatedMoves = updateValidMoves(bagh, bhakras, validMoves);

    // Only update the state if the valid moves actually changed
    if (JSON.stringify(updatedMoves) !== JSON.stringify(validMoves)) {
      setValidMoves(updatedMoves);
    }
  }, [bagh, bhakras]); // Dependencies are only 'bagh' and 'bhakras', not 'validMoves'

  
  const highlightValidMoves = (position: string) => {
    console.log(`Highlighting valid moves for position: ${position}`);
    const newHighlightedCells = new Set<string>();
    validMoves[position]?.forEach(validPos => {
      console.log(`Adding valid position: ${validPos}`);
      newHighlightedCells.add(validPos);
    });
    setHighlightedCells(newHighlightedCells); // Update state for highlighted cells
  };

  const resetHighlights = () => {
    console.log("Resetting highlighted cells");
    setHighlightedCells(new Set()); // Clear highlighted cells when reset
  };

  const handleValidMoveClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const cell = event.target as HTMLElement;
  
    if (!cell.hasAttribute('data-attribute-name')) return;
  
    const position = cell.dataset.position as string;
    console.log(`Clicked on position: ${position}`);
    if (cell.classList.contains('bhag') && !cell.classList.contains('highlighted')) {
      setBhagPosition(position);
      positionOfBhag = position;
    }else{
      positionOfBhag = bagh;
    }
  
    if (!selectedPosition) {
      if (cell.classList.contains('bhag') || cell.classList.contains('bhakra')) {
        console.log(`Selected piece at position: ${position}`);
        setSelectedPosition(position);
        highlightValidMoves(position);
        if(cell.classList.contains('bhakra')){
          bhakraSelected = true;
        }else{
          bhakraSelected = false;
        }
      }
    } else {
      console.log(`Selected position: ${selectedPosition}, Target position: ${position}`);
      if (cell.classList.contains('highlighted') && !bhakraSelected) {
        setBhagPosition(position);
        positionOfBhag = position;
      }else{
        positionOfBhag = bagh;
      }
      i = i + 1;
      bhagPosition1 = bagh; // bhagPosition1 = allBhagPositions[i - 1]
      allBhagPositions.push(positionOfBhag as string);
      console.log(bhagPosition1, positionOfBhag, allBhagPositions, i);
      checkBhakraPosition(positionOfBhag as string, bhakras);
      checkBaghPosition(positionOfBhag as string);
  
      if (highlightedCells.has(position)) {
        const isValidMove = validMoves[selectedPosition]?.includes(position);
        console.log(`Is valid move: ${isValidMove}`);
        console.log(validMoves);
        if (isValidMove) {
          console.log(`Performing move: ${selectedPosition} -> ${position}`);
          setBoardState((prevState) => ({
            ...prevState,
            [position]: prevState[selectedPosition] || '',
            [selectedPosition]: '',
          }));
        }
        setSelectedPosition(null);
        setBhagPosition(null);
        resetHighlights();
      } else {
        console.log('Invalid move. Resetting highlights and selected piece.');
        setBhagPosition(null);
        setSelectedPosition(null);
        resetHighlights();
      }
    }  
  };
  
  return (
    <div className="game-board">
      {Array.from({ length: gridSize }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: gridSize }).map((_, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              handleClick={handleValidMoveClick} // Pass click handler
              isHighlighted={highlightedCells.has(`${rowIndex}.${colIndex}`)} // Highlight based on state
              validMoves={validMoves1}
              boardState={boardState}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
