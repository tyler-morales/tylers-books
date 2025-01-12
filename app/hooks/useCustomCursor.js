import { useState, useEffect } from "react";

export default function useCustomCursor() {
  const [cursorType, setCursorType] = useState("default");

  useEffect(() => {
    // Create the custom cursor element
    const cursor = document.createElement("div");
    cursor.style.width = "48px";
    cursor.style.height = "48px";
    cursor.style.backgroundSize = "contain";
    cursor.style.position = "absolute";
    cursor.style.pointerEvents = "none"; // Cursor doesn't intercept clicks
    cursor.style.zIndex = "1000";
    cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
    document.body.appendChild(cursor);

    const updateCursorStyle = () => {
      switch (cursorType) {
        case "default":
          cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
          cursor.style.transform = "translate(-16px, -5px)";
          break;
        case "pencil":
          cursor.style.backgroundImage = "url(/images/assets/pencil-cursor.png)";
          cursor.style.transform = "translate(-10px, -20px)";
          break;
        case "fist":
          cursor.style.backgroundImage = "url(/images/assets/fist-cursor.png)";
          cursor.style.transform = "translate(-10px, -20px) rotate(-45deg)";
          break;
        default:
          cursor.style.backgroundImage = "url(/images/assets/hand-cursor.png)";
      }
    };

    updateCursorStyle();

    const handleMouseMove = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    const handleMouseDown = () => {
      if (false) {
      }
      setCursorType("fist");
    };

    const handleMouseUp = () => setCursorType("default");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cursor.remove();
    };
  }, [cursorType]);

  return { cursorType, setCursorType };
}
