import React from "react";
import { useState } from "react";
import { useSoundContext } from "../contexts/SoundContext";

const About = () => {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
  const { toggleSoundEffects, toggleMusic, playSoundEffect, isSoundOn, isMusicOn } =
    useSoundContext();
  const [tabs, setTabs] = useState("about");

  const handleTabs = (tab) => {
    playSoundEffect("click");
    setTabs(tab);
  };

  return (
    <section
      popover="auto"
      id="about-popover"
      style={{
        backgroundImage: `url(${apiBasePath}/images/old-wall.png)`,
      }}
      className="transition-all max-w-prose mx-4 sm:m-auto text-justify shadow-xl p-4 text-black bg-orange-200 rounded-lg border-2 border-orange-300 scroll-hidden"
    >
      {/* Title */}
      <div>
        <hr className="h-[2px] bg-orange-950 border-0 mb-2" />
        <hr className="h-[4px] bg-orange-950 border-0 mb-2" />

        <h3 className="text-2xl uppercase font-serif font-black text-center">Tyler&apos;s Books</h3>
        <h4 className="uppercase font-black text-sm text-center font-serif">
          A collection of books I own on my bookshelf
        </h4>

        <hr className="h-[4px] bg-orange-950 border-0 mb-2 mt-2" />
        <hr className="h-[2px] bg-orange-950 border-0 mb-4" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 ">
        <button
          style={
            {
              // backgroundImage: `url(https://i.imgur.com/IMjKmwu.jpg)`,
            }
          }
          onClick={() => handleTabs("about")}
          // className="text-white transition-all px-2 py-1 w-max rounded-lg border-b-2 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
        >
          <span className="font-black sm:text-base">About</span>
        </button>

        <button
          style={
            {
              // backgroundImage: `url(https://i.imgur.com/IMjKmwu.jpg)`,
            }
          }
          onClick={() => handleTabs("credits")}
          // className="text-white transition-all px-2 py-1 w-max rounded-lg border-b-2 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
        >
          <span className="font-black sm:text-base">Credits</span>
        </button>
      </div>

      {/* About */}
      {tabs === "about" && (
        <div className="mt-4">
          <h3 className="font-bold">About</h3>
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
            higlighted the most important part of the project, the books themselves. I wanted to
            build something similar and expand on it.
          </p>
          <p className="mb-2">
            That led me to where I am today! Builidng my very own digtial bookcase of the real
            physical books I own. It&apos;s really cool to see my books in the real world digitally.
            The skeurorphic aesthetic is something i&apos;ve never tried beore, but I am very happy
            with how it turned out.
          </p>
          <p className="mb-2">
            Please, let me know your thoughts and if you have ideas for improvements or features!
          </p>
        </div>
      )}

      {/* Credits */}
      {tabs === "credits" && (
        <div className="mt-4">
          <h3 className="font-bold">Credits</h3>
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
          <p>
            SFX by{" "}
            <a target="_blank" className="underline" href="https://soundcloud.com/audrys-kelecius">
              Audrys Kelecius
            </a>
          </p>
          <p>
            Music by{" "}
            <a
              target="_blank"
              className="underline"
              href="https://pixabay.com/users/fassounds-3433550/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=112191"
            >
              FASSounds
            </a>{" "}
            from{" "}
            <a
              target="_blank"
              className="underline"
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=112191"
            >
              Pixabay
            </a>
          </p>
          <p>
            Thanks to all of the support of my friends and family who have helped me aong the way
            with my journey of code!
          </p>
        </div>
      )}
    </section>
  );
};

export default About;
