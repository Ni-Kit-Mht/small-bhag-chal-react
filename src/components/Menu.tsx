import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Import global styles


const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="game-container">
        <h1>Welcome to Small Bhagchal Game</h1>
        <br></br>
      <button onClick={() => navigate('/game', { state: { isNewGame: true } })}>
        New Game
      </button>
      <br></br>
      <button onClick={() => navigate("/gameContinue")}>
        Continue Game
      </button>
      <br></br>
      <button onClick={() => navigate("/settings")}>
        Settings
      </button>
      
    </div>
  );
};

export default Menu;
