"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";

export default function Book({ data, isSelected, onSelect, isAnyHovered, onHover }) {
  const { title, author, route, year } = data; // Assuming review is part of the data
  const [isHovered, setIsHovered] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [animationParent] = useAutoAnimate();
  const handleImageLoad = ({ target }) => {
    setImageSize({ width: target.naturalWidth / 4, height: target.naturalHeight / 4 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(data);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  function getImageClassName(isHovered, isSelected, isAnyHovered) {
    let className = "transition-all duration-800";

    //  When a book is hovered, it should have opacity 100%. All other books should have opacity 40%
    if (isHovered) {
      className += " opacity-100";
    } else {
      className += " opacity-40";
    }

    // If the book is hovered, translate it up by 2 pixels
    if (isHovered) {
      className += " -translate-y-2 transition-transform ease-in-out";
    }
    // If the book is selected, translate it back to its original position
    if (!isHovered && isAnyHovered) {
      className += " translate-y-0 transition-transform ease-in-out";
    }

    // Return position to 0 if a books hovers away
    if (!isHovered) {
      className += "translate-y-0 transition-transform ease-in-out";
    }

    return className;
  }

  return (
    <motion.li
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.4 }}
      layout
      className="relative flex gap-2 items-end"
    >
      <button onClick={() => onSelect(data)}>
        <Image
          alt={`Book spine of ${title}`}
          width={imageSize.width}
          src={
            process.env.NODE_ENV === "production"
              ? `${process.env.NEXT_PUBLIC_BASE_PATH}/images/${route}`
              : `/images/${route}`
          }
          height={imageSize.height}
          onLoad={handleImageLoad}
          unoptimized={true}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={getImageClassName(isHovered, isSelected, isAnyHovered)}
        />
      </button>
      {isSelected && (
        <div className="pr-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span>by {author}</span>
          <span className="block">{year}</span>
        </div>
      )}
      {isHovered && (
        <div
          className="absolute top-0 left-0 bg-white p-2 text-black z-10 rounded-md shadow-md ml-2 mt-2 min-w-max"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="text-lg font-bold">{title}</h3>
          <span className="text-md italic">by {author}</span>
          <span className="block">{year}</span>
        </div>
      )}
    </motion.li>
  );
}
