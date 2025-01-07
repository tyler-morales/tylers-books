"use client";

import Book from "./Book";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import About from "./examples/components/about";

export default function Home() {
  const containerRef = useRef(null);
  const inputRef = useRef("");

  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({ title: "asc", dateFinished: "asc", year: "asc" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookSizeMultiplier, setbookSizeMultiplier] = useState(4.1);

  const [isScrollable, setIsScrollable] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      console.log("Base Path:", process.env.NEXT_PUBLIC_BASE_PATH || "/");
      console.log("API Base Path:", process.env.NEXT_PUBLIC_API_BASE_PATH);
      try {
        const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
        const response = await fetch(`${apiBasePath}/books.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(shuffleArray(data));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

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

  const handleSelectBook = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  const handleShuffleBooks = useCallback(() => {
    setBooks(shuffleArray([...books]));
  }, [books]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      const searchKey = "/";
      const shuffleKey = "8";

      // Shuffle Books: cmd + 8
      if (event.metaKey && event.key === shuffleKey) {
        event.preventDefault();
        handleShuffleBooks();
      }

      // Focus search input: /
      if (event.key === searchKey) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    // Attach the keydown listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleShuffleBooks]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setbookSizeMultiplier(4.1); // Reset to default
  };

  // const handleShiftEnter = () => {
  //   setIsShifted(!isShifted);
  // };

  // Drop down menu
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  const handleScroll = (scrollability) => {
    console.log("scroll");

    // A section is deemed scrollable,
    if (scrollability) {
      setIsScrollable(true);
    }

    if (scrollability == false) {
      setIsScrollable(false);
    }
  };

  return (
    <>
      <h1 className="text-center">Tyler&apos;s Bookshelf</h1>

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
            onChange={(e) => setbookSizeMultiplier(parseFloat(e.target.value))}
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

      <section className="absolute bottom-0">
        {/* Bookshelf */}
        <ul
          className="flex relative mt-10 overflow-x-auto w-max items-baseline min-w-[100vw] px-4"
          ref={containerRef}
          onMouseOver={() => handleScroll(true)}
        >
          {filteredBooks.map((book, index) => (
            <Book
              key={book.id}
              data={book}
              isSelected={selectedBook === book}
              onSelect={handleSelectBook}
              isAnyHovered={hoveredBook !== null}
              onHover={setHoveredBook}
              bookSizeMultiplier={bookSizeMultiplier}
            />
          ))}
        </ul>

        {/* Wood texture */}
        <div
          className="h-[20px] overflow-y-scroll"
          style={{
            width: `${containerRef.current?.scrollWidth || 0}px`, // Sync the width with the scrollable content
            // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
            backgroundImage: `url(/images/wood-texture.png)`, // local env
          }}
          onMouseOver={() => handleScroll(false)}
        />

        {/* <div className={`overflow-y-scroll transition-all ${isScrollable ? "hidden" : "visible"} `}> */}
        <About isScrollable={isScrollable} />
        {/* </div> */}
      </section>
    </>
  );
}
