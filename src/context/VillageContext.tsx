import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useOverallStats } from '../hooks/useDashboard';

interface Village {
  id: string;
  name: string;
  [key: string]: any;
}

interface VillageContextProps {
  selectedVillageId: string | undefined;
  setSelectedVillageId: (id: string) => void;
  villages: Village[];
  isLoading: boolean;
}

const VillageContext = createContext<VillageContextProps | undefined>(undefined);

export const VillageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVillageId, setSelectedVillageId] = useState<string | undefined>(undefined);
  
  const { data: overallRes, isLoading } = useOverallStats();
  const villagesList: Village[] = overallRes?.data || [];

  // Set default village
  useEffect(() => {
    if (villagesList.length > 0 && !selectedVillageId) {
      const defaultVillage = villagesList.find((v) => v.name === "Satnavari") || villagesList[0];
      if (defaultVillage) {
        setSelectedVillageId(defaultVillage.id);
      }
    }
  }, [villagesList, selectedVillageId]);

  return (
    <VillageContext.Provider value={{ selectedVillageId, setSelectedVillageId, villages: villagesList, isLoading }}>
      {children}
    </VillageContext.Provider>
  );
};

export const useVillageContext = () => {
  const context = useContext(VillageContext);
  if (!context) {
    throw new Error('useVillageContext must be used within a VillageProvider');
  }
  return context;
};
