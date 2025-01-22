import React, { createContext, useContext, useState } from "react";

interface GameContextProps {
  boardState: Record<string, string>;
  setBoardState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boardState, setBoardState] = useState<Record<string, string>>({
    "5.1": "bhag",
    "1.8": "bhakra",
    "5.8": "bhakra",
    "9.8": "bhakra",
  });

  return (
    <GameContext.Provider value={{ boardState, setBoardState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
