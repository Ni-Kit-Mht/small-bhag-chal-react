import React, { useEffect, useRef, useState } from 'react';

interface SVGComponentProps {
  connections: number[][];
  gridSize: number;
}

const SVGComponent: React.FC<SVGComponentProps> = ({ connections, gridSize }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [cellSize, setCellSize] = useState(0);
  const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    const boardElement = document.querySelector('.game-board') as HTMLElement;
    const updateCellSize = () => {
      setBoardWidth(boardElement.offsetWidth);
      setCellSize(boardElement.offsetWidth / gridSize); // Calculate cell size based on grid width
    };

    // Update cell size on initial render and when window resizes
    updateCellSize();
    
    // Function to get the center of a box (grid cell)
    const getBoxCenter = (row: number, col: number) => {
      const x = (col - 1) * cellSize + cellSize / 2; // Calculate center x position
      const y = (row - 1) * cellSize + cellSize / 2; // Calculate center y position
      return { x, y };
    };

    // Function to draw a line between two box centers
    const drawLine = (row1: number, col1: number, row2: number, col2: number) => {
      const start = getBoxCenter(row1, col1);
      const end = getBoxCenter(row2, col2);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", start.x.toString());
      line.setAttribute("y1", start.y.toString());
      line.setAttribute("x2", end.x.toString());
      line.setAttribute("y2", end.y.toString());
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", "2");

      svgRef.current?.appendChild(line);
    };

    // Function to clear the SVG container
    const clearSVG = () => {
      while (svgRef.current?.firstChild) {
        svgRef.current?.removeChild(svgRef.current.firstChild);
      }
    };

    // Function to draw lines between boxes
    const drawLines = () => {
      clearSVG();
      connections.forEach(([box1, box2]) => {
        const [row1, col1] = [
          Math.floor((box1 - 1) / gridSize) + 1,
          (box1) % gridSize + 1,
        ];
        const [row2, col2] = [
          Math.floor((box2 - 1) / gridSize) + 1,
          (box2) % gridSize + 1,
        ];

        drawLine(row1, col1, row2, col2);
      });
    };

    // Draw the initial lines
    drawLines();

    // Listen for window resize events and redraw lines
    const handleResize = () => {
      updateCellSize();
      drawLines();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [connections, gridSize, cellSize]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${boardWidth} ${boardWidth}`}  // Dynamically adjust viewBox for scaling
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Ensure that the SVG doesn't block interactions with other elements
      }}
    />
  );
};

export default SVGComponent;
