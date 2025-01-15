import { useState } from "react";
import useSound from "use-sound";

export default function useSoundManager() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);

  // Sound Effects
  const [playClickSound] = useSound("/sounds/mouse-click.mp3", { volume: 0.5 });
  const [playShuffleSound] = useSound("/sounds/shuffle.mp3", { volume: 0.6 });
  const [playSuccessSound] = useSound("/sounds/success.mp3", { volume: 0.4 });

  // Background Music
  const [playMusic, { stop: stopMusic }] = useSound("/sounds/background-music.mp3", {
    loop: true,
    volume: 0.2,
  });

  const toggleSoundEffects = () => {
    setIsSoundOn((prev) => !prev);
  };

  const toggleMusic = () => {
    if (isMusicOn) {
      stopMusic(); // Stop music when toggled off
    } else {
      playMusic(); // Play music when toggled on
    }
    setIsMusicOn((prev) => !prev);
  };

  // Play different sound effects based on action
  const playSoundEffect = (soundType = "click") => {
    if (!isSoundOn) return;

    switch (soundType) {
      case "click":
        playClickSound();
        break;
      case "shuffle":
        playShuffleSound();
        break;
      case "success":
        playSuccessSound();
        break;
      default:
        console.warn(`Unknown sound type: ${soundType}`);
    }
  };

  return {
    isSoundOn,
    isMusicOn,
    toggleSoundEffects,
    toggleMusic,
    playSoundEffect,
  };
}
