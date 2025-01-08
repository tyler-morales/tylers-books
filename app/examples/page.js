"use client";
import { useState } from "react";

const ExamplesPage = () => {
  const [isScrollable, setIsScrollable] = useState(null);

  const handleScroll = (scrollability) => {
    // A section is deemed scrollable,
    if (scrollability) {
      setIsScrollable(true);
    }

    if (scrollability == false) {
      setIsScrollable(false);
    }
  };

  return (
    <section
      className={`w-full max-h-[550px] overflow-y-scroll overflow-x-hidden m-0 p-0 bottom-0 absolute`}
    >
      {/* Non-scrollable section BOOKSHELF */}
      <div onMouseOver={() => handleScroll(true)} className="h-[500px] bg-red-600">
        <p>This does NOT scroll.</p>
      </div>

      {/* Scrollable section 1 SHELF BOTTOM */}
      <div onMouseOver={() => handleScroll(false)} className="h-[50px] bg-green-600">
        <p>This section can scroll.</p>
        <p>Additional content to demonstrate scrolling...</p>
      </div>

      {/* Scrollable section 2 ABOUT SECTION */}
      <div className={`h-max  bg-blue-500 transition-all ${isScrollable ? "hidden" : "visible"} `}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet aliquet finibus.
          Praesent laoreet aliquam massa viverra consectetur. Vivamus pellentesque placerat ligula,
          varius bibendum lectus volutpat in. Maecenas sit amet placerat sapien. Aliquam at ultrices
          sapien, sit amet sagittis tortor. Sed rutrum tellus ut justo laoreet ultricies. Quisque
          vitae pulvinar mauris, in commodo tortor. Aliquam euismod sodales urna sit amet sagittis.
          Nunc lectus tellus, faucibus bibendum nisi nec, aliquet finibus justo. Ut consequat leo ut
          maximus tincidunt. Donec ipsum arcu, congue ac augue non, laoreet dignissim felis.
        </p>
      </div>
    </section>
  );
};

export default ExamplesPage;
