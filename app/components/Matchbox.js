import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Matchbox() {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";

  // 📌 State Management
  const [matchState, setMatchState] = useState({
    state: "side", // Matchbox state: "side", "closed", "open", "back"
    position: { x: 70, y: 50 }, // Match position
    showMatch: false, // Whether match is visible
    isIgnited: false, // Whether match is lit
  });

  // 📌 Helper Functions
  const setMatchboxState = (newState) => {
    setMatchState((prev) => ({ ...prev, state: newState }));
  };

  const moveMatch = (x, y) => {
    setMatchState((prev) => ({
      ...prev,
      position: { x, y },
    }));
  };

  const igniteMatch = () => {
    setMatchState((prev) => ({ ...prev, isIgnited: true }));
  };

  // 📌 Matchbox, Match & Candle Images
  const matchImages = {
    side: { route: "side.png", size: { width: 40, height: 200 } },
    closed: { route: "back.png", size: { width: 200, height: 200 } },
    open: { route: "open.png", size: { width: 200, height: 450 } },
    match: { route: "match.png", size: { width: 15, height: 40 } },
    back: { route: "flint.png", size: { width: 200, height: 200 } },
    flame: { route: "flame.gif", size: { width: 30, height: 60 } }, // 🔥 GIF
    candle: { route: "candle.png", size: { width: 80, height: 200 } }, // 🕯️ Candle
  };

  // 📌 Handle Matchbox Click (State Transitions)
  const handleMatchboxClick = () => {
    switch (matchState.state) {
      case "side":
        setMatchboxState("closed");
        break;
      case "closed":
        setMatchboxState("open");
        setMatchState((prev) => ({ ...prev, showMatch: true }));
        break;
      // case "ignited":
      //   console.log('ready to light');

      default:
        break;
    }
  };

  // 📌 Handle Match Click (Move & Ignite)
  const handleMatchClick = (e) => {
    e.stopPropagation(); // Prevents triggering matchbox click

    if (matchState.state === "open") {
      setMatchboxState("back"); // Move to Flint Side
      moveMatch(70, 10); // Snap match to bottom
    } else if (matchState.state === "back") {
      console.log("🔥 ignited 🔥"); // Ignition event
      moveMatch(170, matchState.position.y); // Move match right
      igniteMatch(); // Show flame
    }
  };

  // 📌 Extract Current Matchbox Image Info
  const { route, size } = matchImages[matchState.state];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={matchState.state}
        className="relative"
        onClick={handleMatchboxClick}
        initial={{ y: -500 }}
        animate={{
          y: [-100, 5, -10, 0], // Drop, impact, slight bounce, settle
          transition: {
            y: {
              type: "tween",
              duration: 1.2, // Slightly longer for realism
              ease: ["easeIn", "backOut"], // Organic bounce easing
            },
          },
        }}
      >
        {/* 🕯️ Candle (Only appears when ignited) */}
        {matchState.isIgnited && (
          <motion.div
            className="absolute left-1/3 bottom-0 " // ✅ Behind matchbox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -100, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              alt="Candle"
              width={matchImages.candle.size.width}
              height={matchImages.candle.size.height}
              src={`${apiBasePath}/images/assets/matches/candle.png`}
              unoptimized
            />
          </motion.div>
        )}

        {/* 🔥 Match */}
        {matchState.showMatch && (
          <motion.div
            className="absolute transition-all cursor-pointer z-50"
            style={{
              bottom: `${matchState.position.y}px`,
              left: `${matchState.position.x}px`,
              transform: matchState.state === "back" ? "rotate(-135deg)" : "rotate(0deg)",
            }}
            onClick={handleMatchClick}
            animate={{ left: matchState.position.x, bottom: matchState.position.y }}
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
                  className="absolute -top-[20px] -right-[13px] w-[40px]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "anticipate" }}
                >
                  <Image
                    alt="Flame"
                    width={100}
                    height={100}
                    src={`${apiBasePath}/images/assets/matches/flame.gif`}
                    unoptimized
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 🏠 Matchbox */}
        <motion.div
          className="z-[2] relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: [1, 0.98, 1] }} // 📌 Subtle squish effect on click
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Image
            alt="Matchbox"
            width={size.width}
            height={size.height}
            src={`${apiBasePath}/images/assets/matches/${route}`}
            unoptimized
            style={{ boxShadow: "5px 3px 5px black" }}
            onDragStart={(e) => e.preventDefault()}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
