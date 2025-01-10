"use client"; // Important for Next.js since `document` and `window` are client-side

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default");

  useEffect(() => {
    // Create cursor element
    const cursor = document.createElement("div");
    cursor.style.width = "48px";
    cursor.style.height = "48px";
    cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
    cursor.style.backgroundSize = "contain";
    cursor.style.position = "absolute";
    cursor.style.pointerEvents = "none"; // Ensures it's "invisible" to clicks
    cursor.style.zIndex = "1000";
    cursor.style.overflow = "hidden";
    // cursor.style.transition = "transform 0.1s ease-out";
    document.body.appendChild(cursor);

    const updateCursorStyle = () => {
      switch (cursorType) {
        case "default":
          cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
          cursor.style.transform = "translate(-16px, -5px)"; // Center the cursor
          break;
        case "pencil":
          cursor.style.backgroundImage = "url(/images/assets/pencil-cursor.png)";
          cursor.style.transform = "translate(-10px, -20px )"; // Center the cursor
          break;
        default:
          cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
      }
    };

    updateCursorStyle();

    // Mouse move handler
    const handleMouseMove = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;

      const hoveredElement = e.target;

      // Change cursor type based on hovered element
      if (hoveredElement.getAttribute("data-cursor-type") === "pencil") {
        setCursorType("pencil");
      } else {
        setCursorType("default");
      }
    };

    // Mouse down/up for "click effect"
    const handleMouseDown = () => {
      if (cursorType == "default") {
        cursor.style.transform = "translate(-16px, -5px) scale(0.8)";
      }
    };

    const handleMouseUp = () => {
      if (cursorType == "default") {
        cursor.style.transform = "translate(-16px, -5px) scale(1)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Cleanup on unmount
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cursor.remove();
    };
  }, [cursorType]);

  useEffect(() => {
    document.body.style.cursor = "none"; // Hide system cursor
    return () => {
      document.body.style.cursor = "auto"; // Restore cursor on cleanup
    };
  }, []);

  return null; // No visual return since this is for controlling cursor behavior
}
