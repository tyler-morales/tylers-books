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
    <nav className="flex gap-2 flex-wrap px-2">
      <button
        onClick={() => sortBooks("title")}
        className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2 w-max"
      >
        Sort Alphabetically ({sortOrder.title === "asc" ? "A-Z" : "Z-A"})
      </button>
      <button
        onClick={() => sortBooks("year")}
        className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
      >
        Sort by Year ({sortOrder.year === "asc" ? "Oldest First" : "Newest First"})
      </button>
      <button
        onClick={() => sortBooks("dewey")}
        className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
      >
        Sort by Dewey Decimal ({sortOrder.dewey === "asc" ? "Low-High" : "High-Low"})
      </button>
      <button
        onClick={handleShuffleBooks}
        className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
      >
        🔀
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2 py-1 w-72"
      />
      {/* Slider */}
      <div className="flex items-center gap-2">
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
      </div>
    </nav>
  );
};

export default Settings;
