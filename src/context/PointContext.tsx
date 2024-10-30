import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode 
} from 'react';

interface PointsContextType {
  points: number;
  addPoints: (pointsToAdd: number) => void;
  consumePoints: (pointsToConsume: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(0);

  const addPoints = (pointsToAdd: number) => {
    setPoints(prevPoints => prevPoints + pointsToAdd);
  };

  const consumePoints = (pointsToConsume: number) => {
    setPoints(prevPoints => Math.max(prevPoints - pointsToConsume, 0));
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, consumePoints }}>
      {children}
    </PointsContext.Provider>
  );
};

// Hook para acceder al contexto
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints debe ser usado dentro de PointsProvider');
  }
  return context;
};
