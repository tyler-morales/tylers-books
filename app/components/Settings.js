import { useEffect } from "react";

const Settings = ({
  setBooks,
  setSortOrder,
  books,
  sortOrder,
  handleShuffleBooks,
  inputRef,
  searchQuery,
  setSearchQuery,
  bookSizeMultiplier,
  setBookSizeMultiplier,
}) => {
  // Reset size of book to base
  const handleReset = () => {
    setBookSizeMultiplier(4.1); // Reset to default
  };

  // Set search query equal to the user's input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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

    setBooks(sortedBooks);
    setSortOrder({ ...sortOrder, [criteria]: order });
  };

  return (
    <nav
      style={{
        // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
        backgroundImage: "url(/images/wood.jpg)",
      }}
      className="flex gap-2 flex-wrap px-2 h-[50px] items-center"
    >
      <button
        onClick={() => sortBooks("title")}
        className="raised transition-all px-4 py-1 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
      >
        <span className="font-fustat font-extrabold text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)]">
          Sort Alphabetically ({sortOrder.title === "asc" ? "A-Z" : "Z-A"})
        </span>
      </button>

      <button
        onClick={() => sortBooks("year")}
        className="raised transition-all px-4 py-1 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
      >
        <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)]">
          Sort by Year ({sortOrder.year === "asc" ? "Oldest First" : "Newest First"}){" "}
        </span>
      </button>

      <button
        onClick={() => sortBooks("dewey")}
        className="raised transition-all px-4 py-1 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
      >
        <span className="font-black text-orange-200 drop-shadow-[1px_2px_0px_rgba(0,0,0,1.0)]">
          {" "}
          Sort by Dewey Decimal ({sortOrder.dewey === "asc" ? "Low-High" : "High-Low"})
        </span>
      </button>

      <button
        onClick={handleShuffleBooks}
        className="raised transition-all px-2 py-1 rounded-lg border-b-4 border-orange-950 hover:border-b-2 border-x-2 active:border-b-[1px]"
      >
        <span className="font-black text-orange-200 drop-shadow-[0_1px_0_rgba(0,0,0,1.0)]">🔀</span>
      </button>

      {/* Search bar */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        className="sunken border-b-2 border-green-400 focus:border-b-2 outline-blue-500 placeholder:text-orange-300 font-black text-white rounded-md px-2 py-1 w-72"
      />

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
    </nav>
  );
};

export default Settings;
