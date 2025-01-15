import { useState } from "react";
import useSound from "use-sound";
import { useSoundContext } from "../contexts/SoundContext";

export default function useSoundManager() {
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Sound Effects
  const { isSoundOn } = useSoundContext(); // Access global state
  const [playClickSound] = useSound("/sounds/mouse-click.mp3", { volume: 0.5 });
  const [playShuffleSound] = useSound("/sounds/shuffle.mp3", { volume: 0.6 });
  const [playDoorOpen] = useSound("/sounds/door-open.mp3", { volume: 0.5 });
  const [playDoorClose] = useSound("/sounds/door-close.mp3", { volume: 0.5 });

  // Background Music
  const [playMusic, { stop: stopMusic }] = useSound("/sounds/lofi-study.mp3", {
    loop: true,
    volume: 0.1,
  });

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
      case "door-open":
        playDoorOpen();
        break;
      case "door-close":
        playDoorClose();
        break;
      default:
        console.warn(`Unknown sound type: ${soundType}`);
    }
  };

  return {
    isSoundOn,
    isMusicOn,
    toggleMusic,
    playSoundEffect,
  };
}
