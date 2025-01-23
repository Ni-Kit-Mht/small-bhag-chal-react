import './App.css';
import { Game } from './components/Game';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu"; // Import the Menu component
import Settings from "./components/Settings"
import GameContinue from "./components/GameContinue"
import { GameProvider } from "./context/GameContext"; // Import GameProvider

function App() {
  return (
    <GameProvider>
    <Router>
      <div className="App">
        {/* Define the routes */}
        <Routes>
          <Route path="/small-bhag-chal-react" element={<Menu />} /> {/* Menu Screen */}
          <Route path="/game" element={<Game />} /> {/* Game Screen */}
          <Route path="/settings" element={<Settings />} /> {/* Settings Screen */}
          <Route path="/gameContinue" element = {<GameContinue /> } /> {/* Game Contunue Screen */}
        </Routes>
      </div>
    </Router>
    </GameProvider>
  );
}

export default App;
