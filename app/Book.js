"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Book({ data, isSelected, onSelect, isAnyHovered, onHover }) {
  const { title, author, route, year } = data; // Assuming review is part of the data
  const [isHovered, setIsHovered] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [animationParent] = useAutoAnimate();

  const handleImageLoad = ({ target }) => {
    setImageSize({ width: target.naturalWidth / 4, height: target.naturalHeight / 4 });
    console.log(imageSize);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(data);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  return (
    <li>
      <button
        onClick={() => onSelect(data)}
        className="relative flex gap-2 items-end"
        ref={animationParent}
      >
        <Image
          src={`/images/${route}`}
          alt={`Book spine of ${title}`}
          width={imageSize.width}
          height={imageSize.height}
          onLoad={handleImageLoad}
          unoptimized={true}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`transition-opacity duration-300 ${
            isHovered || isSelected || !isAnyHovered ? "opacity-100" : "opacity-40"
          }`}
        />
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
          </div>
        )}
      </button>
    </li>
  );
}
