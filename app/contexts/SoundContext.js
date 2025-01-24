"use client";
import { createContext, useContext, useState } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";

  // State
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Sound Effects
  const [playClickSound] = useSound(`${apiBasePath}/sounds/mouse-click.mp3`, { volume: 0.5 });
  const [playShuffleSound] = useSound(`${apiBasePath}/sounds/chimes.wav`, { volume: 0.9 });
  const [playDoorOpen] = useSound(`${apiBasePath}/sounds/door-open.mp3`, { volume: 0.5 });
  const [playDoorClose] = useSound(`${apiBasePath}/sounds/door-close.mp3`, { volume: 0.5 });
  const [playFlintStrike] = useSound(`${apiBasePath}/sounds/lighter-strike.mp3`, { volume: 0.5 });
  const [playPop] = useSound(`${apiBasePath}/sounds/pop.mp3`, { volume: 0.5 });
  const [playSlam] = useSound(`${apiBasePath}/sounds/door-slam.mp3`, { volume: 0.5 });
  const [playFlicker] = useSound(`${apiBasePath}/sounds/flicker.mp3`, { volume: 0.7 });
  const [playWhistle] = useSound(`${apiBasePath}/sounds/slide-whistle.mp3`, { volume: 0.5 });
  const [playSwitch] = useSound(`${apiBasePath}/sounds/light-switch.mp3`, { volume: 0.5 });

  // Music
  const [playMusic, { stop: stopMusic }] = useSound(`${apiBasePath}/sounds/lofi-study.mp3`, {
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
    strike: playFlintStrike,
    pop: playPop,
    slam: playSlam,
    flicker: playFlicker,
    slide: playWhistle,
    switch: playSwitch,
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
