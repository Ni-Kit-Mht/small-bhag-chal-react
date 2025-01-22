import "../styles/styles.css";

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, rowIndex: number, colIndex: number) => void;
  isHighlighted: boolean; // Receive isHighlighted to apply highlight styles
  validMoves: string[];
  boardState: Record<string, string>; // Flat object representing the board state
}

export const GridCell = ({ rowIndex, colIndex, handleClick, isHighlighted,validMoves, boardState}: GridCellProps) => {
  const position = `${rowIndex}.${colIndex}`;

  // Check if the position is in validMoves
  const isValidMove = validMoves.includes(position);

  const cellClass = boardState[position] || "";

  return isValidMove ? (
    <div
      data-attribute-name="cell" // Custom data attribute
      className={`grid-cell ${cellClass} ${isHighlighted ? 'highlighted' : ''}`} // Apply highlight class based on state
      data-row={rowIndex}
      data-col={colIndex}
      data-position={position} // Store position as data attribute
      style={{
        fontSize: '1em',
        height: 'calc(min(100vh, 100vw)/12)', // Responsive height based on screen size
      }}
      onClick={(e) => handleClick(e, rowIndex, colIndex)} // Trigger click handler
    >
      {`${rowIndex}, ${colIndex}`} {/* Optionally display 1-based row and column */}
    </div>
  ) : <div
  className={`grid-cell ${cellClass} ${isHighlighted ? 'highlighted' : ''}`} // Apply highlight class based on state
  data-row={rowIndex}
  data-col={colIndex}
  data-position={`${rowIndex}.${colIndex}`} // Store position as data attribute
  style={{
    fontSize: '1em',
    height: 'calc(min(100vh, 100vw)/12)', // Responsive height based on screen size
  }}
  onClick={(e) => handleClick(e, rowIndex, colIndex)} // Trigger click handler
>
  {`${rowIndex}, ${colIndex}`} {/* Optionally display 1-based row and column */}
</div>
};
