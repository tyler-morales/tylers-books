import { useState } from "react";

export default function useDragDetection() {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(false);
  };
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = (onClickCallback = () => {}) => {
    if (!isDragging && typeof onClickCallback === "function") {
      onClickCallback(); // Only call the function if it is valid
    }
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
}
