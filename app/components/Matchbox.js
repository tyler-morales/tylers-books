import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useBackground } from "../contexts/BackgroundContext";
import { useState } from "react";
import { useSoundContext } from "../contexts/SoundContext";

export default function Matchbox() {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
  const { playSoundEffect } = useSoundContext();
  const { setIsCandleLit } = useBackground(); // ✅ Access function to change background

  // 📌 State Management
  const [matchState, setMatchState] = useState({
    step: "side", // "side" → "closed" → "open" → "flint" → "ignited" → "light"
    matchPosition: { x: 70, y: 50 }, // Track match movement
    matchRotation: 0, // Track match rotation
    showMatch: false, // Show the match or not
    isIgnited: false, // Track if the match is burning
    isCandleLit: false, // Track if the candle should appear
  });

  // 📌 Images
  const matchImages = {
    side: { route: "side.png", size: { width: 40, height: 200 } },
    closed: { route: "back.png", size: { width: 200, height: 200 } },
    open: { route: "open.png", size: { width: 200, height: 450 } },
    flint: { route: "flint.png", size: { width: 200, height: 200 } },
    match: { route: "match.png", size: { width: 15, height: 40 } },
    flame: { route: "flame-2.gif", size: { width: 30, height: 60 } },
    candle: { route: "candle.png", size: { width: 80, height: 200 } },
  };

  // 📌 Step 1: Click Side Matchbox → Go to Closed State
  const handleMatchboxClick = () => {
    switch (matchState.step) {
      case "side":
        playSoundEffect("pop");
        setMatchState((prev) => ({ ...prev, step: "closed" }));
        break;
      case "closed":
        playSoundEffect("door-open");
        setMatchState((prev) => ({
          ...prev,
          step: "open",
          showMatch: true, // Show the match when the box opens
        }));
        break;
      default:
        break;
    }
  };

  // 📌 Step 2: Click Match → Move Up & Rotate → Show Flint Side
  const handleMatchClick = (e) => {
    e.stopPropagation(); // Prevents matchbox click from triggering

    if (matchState.step === "open") {
      playSoundEffect("slam");
      setMatchState((prev) => ({
        ...prev,
        step: "flint",
        matchPosition: { x: 50, y: 20 }, // Move match to flit
        matchRotation: -135,
      }));
    } else if (matchState.step === "flint") {
      igniteMatch(); // Proceed to igniting match & showing candle
    }
  };

  // 📌 Step 3: Strike Flint → Show Flame → Reveal Candle
  const igniteMatch = () => {
    setMatchState((prev) => ({
      ...prev,
      isIgnited: true, // Show flame
      matchPosition: { x: 185, y: 5 }, // Move match right to strike flint
    }));
    playSoundEffect("strike");

    setTimeout(() => {
      setMatchState((prev) => ({
        ...prev,
        showCandle: true, // Candle appears after match is lit
      }));
      playSoundEffect("slide");
    }, 1000);
  };

  // 📌 Step 4: Click Wick → Light Candle
  const lightWick = () => {
    // Move match to the candle
    setMatchState((prev) => ({
      ...prev,
      matchPosition: { x: 50, y: 300 },
      isCandleLit: false, // Show candle flame
      isIgnited: true, // Hide match flame (optional)
      step: prev.step, // Keep the matchbox in its current state
      showCandle: true, // Ensure candle stays visible
      showMatch: true, // Ensure match stays visible
      position: prev.position, // Maintain match position
    }));

    // light the candle after 1.5s
    setTimeout(() => {
      playSoundEffect("switch");
      playSoundEffect("flicker");
      setMatchState((prev) => ({
        ...prev,
        isCandleLit: true,
        matchRotation: -200,
      }));
      setTimeout(() => {
        setIsCandleLit(true);
      }, 850);

      // ⏳ Automatically extinguish flame after 10 seconds
      setTimeout(() => {
        setMatchState((prev) => ({ ...prev, isIgnited: false })); // Remove flame
        setIsCandleLit(false); // ✅ Reset background
        resetMatchbox();
      }, 14000);
    }, 800);
  };

  // 📌 Step 5: Reset matchbox
  const resetMatchbox = () => {
    setIsCandleLit(false);
    setMatchState({
      step: "side",
      matchPosition: { x: 70, y: 50 },
      matchRotation: 0,
      showMatch: false,
      isIgnited: false,
      isCandleLit: false,
    });
  };

  // 📌 Extract the correct image based on the current step
  const { route, size } = matchImages[matchState.step] || matchImages.side;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={matchState.step}
        className="relative"
        onClick={handleMatchboxClick}
        initial={{ y: -500, scale: 0.9 }}
        animate={{
          opacity: [-50, 0, 1],
          scale: 1,
          y: [-3, 0], // Drop effect
          transition: { y: { type: "tween", duration: 0.8, ease: ["easeIn", "backOut"] } },
        }}
      >
        {/* 🕯️ Candle (Appears after match ignites) */}
        {matchState.showCandle && (
          <motion.div
            className="absolute left-1/3 bottom-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -80 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Candle Image */}
            <Image
              alt="Candle"
              width={matchImages.candle.size.width}
              height={matchImages.candle.size.height}
              src={`${apiBasePath}/images/assets/matches/candle.png`}
              unoptimized
            />

            {/* Wick - Clickable area to light the candle */}
            <span onClick={lightWick} className="absolute top-0 w-[50px] h-[40px]"></span>

            {/* 🔥 Candle Flame - Appears when candle is lit */}
            {matchState.isCandleLit && (
              <motion.div
                className="absolute top-[-60px] left-[10px] w-[50px] z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.8 }}
                transition={{ duration: 1.2, ease: "anticipate" }}
              >
                <Image
                  alt="Candle Flame"
                  width={50}
                  height={80}
                  src={`${apiBasePath}/images/assets/matches/${matchImages.flame.route}`}
                  unoptimized
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 🔥 Match */}
        {matchState.showMatch && (
          <motion.div
            className={`absolute transition-all cursor-pointer z-50 ${
              matchState.step === "open" && "animate-wiggle"
            }`}
            style={{
              bottom: `${matchState.matchPosition.y}px`,
              left: `${matchState.matchPosition.x}px`,
              transform: `rotate(${matchState.matchRotation}deg)`,
            }}
            onClick={handleMatchClick}
            animate={{ left: matchState.matchPosition.x, bottom: matchState.matchPosition.y }}
          >
            <div className="relative">
              <Image
                alt="Match"
                width={matchImages.match.size.width}
                height={matchImages.match.size.height}
                src={`${apiBasePath}/images/assets/matches/match.png`}
                unoptimized
              />

              {/* 🔥 Flame GIF - Appears when ignited */}
              {matchState.isIgnited && (
                <motion.div
                  className="absolute -top-[45px] -right-[10px] w-[40px] z-50"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.15 }}
                  transition={{ duration: 1.2, ease: "anticipate" }}
                >
                  <Image
                    alt="Flame"
                    width={100}
                    height={100}
                    src={`${apiBasePath}/images/assets/matches/${matchImages.flame.route}`}
                    unoptimized
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 🏠 Matchbox */}
        <motion.div className="z-[2] relative">
          <Image
            onClick={resetMatchbox}
            alt="Matchbox"
            width={size.width}
            height={size.height}
            src={`${apiBasePath}/images/assets/matches/${route}`}
            unoptimized
            style={{ boxShadow: "5px 3px 5px black" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
