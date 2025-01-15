"use client";
import { createContext, useContext, useState } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  // State
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Sound Effects
  const [playClickSound] = useSound("/sounds/mouse-click.mp3", { volume: 0.5 });
  const [playShuffleSound] = useSound("/sounds/shuffle.mp3", { volume: 0.6 });
  const [playDoorOpen] = useSound("/sounds/door-open.mp3", { volume: 0.5 });
  const [playDoorClose] = useSound("/sounds/door-close.mp3", { volume: 0.5 });
  const [playMusic, { stop: stopMusic }] = useSound("/sounds/lofi-study.mp3", {
    loop: true,
    volume: 0.1,
  });

  // Toggle sound effects
  const toggleSoundEffects = () => {
    setIsSoundOn((prev) => !prev);
  };

  // Toggle background music
  const toggleMusic = () => {
    if (isMusicOn) {
      stopMusic();
    } else {
      playMusic();
    }
    setIsMusicOn((prev) => !prev);
  };

  // Play sound based on type
  const sounds = {
    click: playClickSound,
    shuffle: playShuffleSound,
    "door-open": playDoorOpen,
    "door-close": playDoorClose,
  };

  const playSoundEffect = (soundType = "click") => {
    if (isSoundOn && sounds[soundType]) {
      sounds[soundType](); // Play the sound
    } else if (!sounds[soundType]) {
      console.warn(`Unknown sound type: ${soundType}`);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isSoundOn,
        isMusicOn,
        toggleSoundEffects,
        toggleMusic,
        playSoundEffect,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  return useContext(SoundContext);
};
