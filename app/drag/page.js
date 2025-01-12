"use client";
import React, { useEffect, useRef } from "react";

const DraggableContainer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ele = containerRef.current;
    ele.style.cursor = "grab";

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;

      // Scroll the element
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener("mousedown", mouseDownHandler);

    // Cleanup event listeners on component unmount
    return () => {
      ele.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);
  const btnStyle = {
    background: "gray",
    padding: "5px",
    margin: "5px",
  };
  return (
    <div
      ref={containerRef}
      className="overflow-auto h-[300px] w-[500px] border border-gray-400 scroll-hidden"
      style={{ touchAction: "none" }} // Prevent touch scroll interference on touch devices
    >
      {/* Dragable content */}
      <div style={{ width: "1000px", height: "1000px" }}>
        <button onClick={() => console.log("hello")} style={btnStyle}>
          Click me once
        </button>
        <button style={btnStyle}>Click me once</button>
        <button style={btnStyle}>Click me once</button>
      </div>
    </div>
  );
};

export default DraggableContainer;
