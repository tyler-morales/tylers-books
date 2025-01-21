import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Matchbox() {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";

  return (
    <motion.li
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
      <Image
        alt="Matchboox"
        width="40"
        height="200"
        src={`${apiBasePath}/images/assets/matchbox.png`}
        unoptimized={true}
        style={{ boxShadow: "5px 3px 5px black" }}
        onDragStart={(e) => e.preventDefault()} // Prevent ghost image
      />
    </motion.li>
  );
}
