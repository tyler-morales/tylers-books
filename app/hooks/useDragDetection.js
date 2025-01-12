// hooks/useDragDetection.js
import { useState } from "react";

export default function useDragDetection() {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = (onClickCallback) => {
    if (!isDragging) onClickCallback();
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
}
