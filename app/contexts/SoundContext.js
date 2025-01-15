"use client";
import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const toggleSoundEffects = () => {
    setIsSoundOn((prev) => !prev);
  };

  const toggleMusic = () => {
    setIsMusicOn((prev) => !prev);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSoundEffects, isMusicOn, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  return useContext(SoundContext);
};
