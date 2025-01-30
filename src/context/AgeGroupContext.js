import React, { createContext, useContext, useState } from 'react';

const AgeGroupContext = createContext();

export const AgeGroupProvider = ({ children }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('para bebês até 3 anos');

  return (
    <AgeGroupContext.Provider value={{ selectedAgeGroup, setSelectedAgeGroup }}>
      {children}
    </AgeGroupContext.Provider>
  );
};

export const useAgeGroup = () => useContext(AgeGroupContext);
