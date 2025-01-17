import { useState } from "react";
import { useSoundContext } from "../contexts/SoundContext";

const Settings = ({
  setBooks,
  setSortOrder,
  books,
  sortOrder,
  handleShuffleBooks,
  sharedState,
}) => {
  const { toggleSoundEffects, toggleMusic, playSoundEffect, isSoundOn, isMusicOn } =
    useSoundContext();
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    playSoundEffect();
  };

  // Sort books based on criteria
  const sortBooks = (criteria) => {
    const order = sortOrder[criteria] === "asc" ? "desc" : "asc";
    const sortedBooks = [...books].sort((a, b) => {
      switch (criteria) {
        case "title":
          return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        case "year":
          return order === "asc" ? a.year - b.year : b.year - a.year;
        case "dewey":
          return order === "asc"
            ? a.deweyDecimal - b.deweyDecimal
            : b.deweyDecimal - a.deweyDecimal;
        // Add other sorting methods here
        default:
          return 0;
      }
    });
    playSoundEffect("click");
    setBooks(sortedBooks);
    setSortOrder({ ...sortOrder, [criteria]: order });
  };

  const handleMenu = () => {
    playSoundEffect("click");
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row absolute sm:relative bottom-1 sm:bottom-0 sm:items-center gap-2 px-2 z-[99] sm:w-max w-full">
      {isOpen && (
        <div className="flex sm:flex-row flex-col gap-2 shadow-xl pt-4 pb-2 px-2 sm:p-0">
          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={() => sortBooks("title")}
            className="raised transition-all px-4 sm:py-1 py-3 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              Alphabetically ({sortOrder.title === "asc" ? "A-Z" : "Z-A"})
            </span>
          </button>

          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={() => sortBooks("year")}
            className="raised transition-all px-4 sm:py-1 py-3 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              Published Year ({sortOrder.year === "asc" ? "Oldest First" : "Newest First"}){" "}
            </span>
          </button>

          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={() => sortBooks("dewey")}
            className="raised transition-all px-4 sm:py-1 py-3 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              {" "}
              Dewey Decimal ({sortOrder.dewey === "asc" ? "Low-High" : "High-Low"})
            </span>
          </button>

          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={handleShuffleBooks}
            className="raised transition-all px-2 sm:py-1 py-3 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[0_1px_0_rgba(0,0,0,1.0)] text-lg sm:text-base">
              🔀
            </span>
          </button>
        </div>
      )}
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={handleMenu}
            className="raised transition-all px-2 py-1 w-max rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              {isOpen ? "Close sort menu" : "Sort"}
            </span>
          </button>
          <button
            popoverTarget="about-popover"
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={handleModal}
            className="raised transition-all px-2 py-1 w-max rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              {sharedState ? "Close About" : "About"}
            </span>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={toggleSoundEffects}
            className="raised transition-all px-2 py-1 w-max rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              {isSoundOn ? "🔈" : "🔇"}
            </span>
          </button>
          <button
            style={{
              backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
            }}
            onClick={toggleMusic}
            className="raised transition-all px-2 py-1 w-max rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
          >
            <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)] text-lg sm:text-base">
              {isMusicOn ? "⏸️" : "▶️"}
            </span>
          </button>
        </div>
      </div>

      {/* Slider */}
      {/* <div className="flex items-center gap-2">
        <label htmlFor="bookSizeSlider" className="mr-2">
          Book Size:
        </label>
        <input
          id="bookSizeSlider"
          type="range"
          min="4.1"
          max="6"
          step="0.1"
          value={bookSizeMultiplier}
          onChange={(e) => setBookSizeMultiplier(parseFloat(e.target.value))}
          className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
        />
        <span className="ml-2">{bookSizeMultiplier.toFixed(1)}</span>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700"
        >
          Reset
        </button>
      </div> */}
    </div>
  );
};

export default Settings;
