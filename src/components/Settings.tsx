import React from "react";
import "../styles/styles.css"

const Settings: React.FC = () => {
  return (
    <div
        className="game-container"
    >
        <h1>Here, you can configure the game options!</h1>
        <br></br>
      <button
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Settings;
