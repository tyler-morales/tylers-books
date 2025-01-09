import React from "react";

const About = ({ isAboutVisible }) => {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";

  return (
    <section
      style={{
        backgroundImage: `url(${apiBasePath}/images/old-wall.png)`,
      }}
      className={`h-[550px] sm:h-auto overflow-y-scroll transition-all text-black max-w-md text-justify p-4 m-6 relative shadow-xl bg-orange-200 rounded-lg border-2 border-orange-300 scroll-hidden ${
        isAboutVisible ? "visible opacity-100 translate-y-0" : "hidden opacity-0 translate-y-6"
      }`}
    >
      <div>
        <hr className="h-[2px] bg-orange-950 border-0 mb-2" />
        <hr className="h-[4px] bg-orange-950 border-0 mb-2" />

        <h3 className="text-2xl uppercase font-serif font-black text-center">Tyler&apos;s Books</h3>
        <h4 className="uppercase font-black text-sm  font-serif">
          A collection of books I own on my bookshelf
        </h4>

        <hr className="h-[4px] bg-orange-950 border-0 mb-2 mt-2" />
        <hr className="h-[2px] bg-orange-950 border-0 mb-4" />

        <p className="mb-2">
          The idea for this projet came from following one of my favorite design accounts on
          instagram,{" "}
          <a
            href="https://www.instagram.com/designteamofone/"
            className="underline"
            target="_blank"
          >
            Design Team of One.
          </a>{" "}
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
    </section>
  );
};

export default About;
