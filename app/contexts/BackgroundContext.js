"use client";
import { createContext, useContext, useState } from "react";

const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const [isCandleLit, setIsCandleLit] = useState(false);

  return (
    <BackgroundContext.Provider value={{ isCandleLit, setIsCandleLit }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
