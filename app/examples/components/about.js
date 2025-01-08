import React from "react";

const About = ({ isScrollable }) => {
  return (
    <div className={`max-w-md text-justify p-4 ${isScrollable ? "hidden" : "visible"}`}>
      <div>
        <hr className="h-[2px] bg-white border-0 mb-2 mt-4" />
        <hr className="h-[4px] bg-white border-0 mb-2" />

        <h3 className="text-2xl uppercase font-serif font-black">Tyler&apos;s Books</h3>
        <h4 className="uppercase font-black text-sm  font-serif">
          A collection of books I own on my bookshelf
        </h4>

        <hr className="h-[4px] bg-white border-0 mb-2 mt-2" />
        <hr className="h-[2px] bg-white border-0 mb-4" />

        <p className="mb-2">
          The idea for this projet came from following one of my favorite design accounts on
          instagram,{" "}
          <a
            href="https://www.instagram.com/designteamofone/"
            className="underline"
            target="_blank"
          >
            Design Team of One.
          </a>
          In one of her posts, she highlighted a project by{" "}
          <a href="https://books.omarmhmmd.com/" target="_blank" className="underline">
            Omar Mohammad
          </a>{" "}
          who built a digital collection of the books he&apos;s read. The minimal digital design
          higlighted the most important part of the project, the books themselves. I wanted to build
          something similar and expand on it.
        </p>
        <p className="mb-2">
          That led me to where I am today! Builidng my very own digtial bookcase of the real
          physical books I own. It&apos;s really cool to see my books in the real world digitally.
          The skeurorphic aesthetic is somthign i&apos;ve never tried beore, but I am very happy
          with how it turned out.
        </p>
        <p className="mb-2">
          Please Let me know your thougts and if you have ideas for improvements or features!
        </p>
      </div>

      <div className="text-sm mt-4">
        <p>
          Designed and developed by{" "}
          <a href="https://tylermorales.pro" target="_blank" className="underline">
            Tyler Morales
          </a>
        </p>
        <p>
          Inspired by{" "}
          <a href="https://books.omarmhmmd.com/" target="_blank" className="underline">
            Omar Mohammad
          </a>{" "}
          and{" "}
          <a
            href="https://www.instagram.com/designteamofone/"
            className="underline"
            target="_blank"
          >
            Design Team of One
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
