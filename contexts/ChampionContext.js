import { createContext, useContext } from "react";
import { useChampionData } from "../hooks/data/useChampionData";

const ChampionContext = createContext();

// Provider component to wrap the app and provide champion data
export const ChampionProvider = ({ children }) => {
  const championData = useChampionData();

  return (
    <ChampionContext.Provider value={championData}>
      {children}
    </ChampionContext.Provider>
  );
};

// Hook to use champion context
export const useChampion = () => {
  const context = useContext(ChampionContext);
  if (!context) {
    throw new Error("useChampion must be used within ChampionProvider");
  }
  return context;
};
