"use client";

import Book from "./Book";
import { useEffect, useState, useCallback, useRef } from "react";
import About from "./components/about";
import Plaque from "./components/Plaque";
import Settings from "./components/Settings";

export default function Home() {
  const containerRef = useRef(null);
  const inputRef = useRef("");
  const targetDivRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({ title: "asc", dateFinished: "asc", year: "asc" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookSizeMultiplier, setBookSizeMultiplier] = useState(4.1);

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

  const handleSelectBook = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  const handleShuffleBooks = useCallback(() => {
    setBooks(shuffleArray([...books]));
  }, [books]);

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

  const handleScroll = (scrollability) => {
    // A section is deemed scrollable,
    if (scrollability) {
      setIsScrollable(true);
    }

    if (scrollability == false) {
      setIsScrollable(false);
    }
  };

  // Set search query equal to the user's input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <nav
        style={{
          // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
          backgroundImage: "url(/images/wood.jpg)",
        }}
        className="flex gap-2 flex-wrap px-2 items-center justify-center sm:justify-start sm:gap-4 sm:h-[40px] py-2 sm:p-0"
      >
        <Plaque target={containerRef} />

        {/* Search bar */}
        {/* <h3 className="font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,1)]">Search</h3> */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="sunken w-full border-b-2 border-green-400 focus:border-b-2 outline-blue-500 placeholder:text-orange-300 font-black text-white rounded-md px-2 py-1 sm:w-72"
        />
      </nav>
      <section className="w-full max-h-[750px] overflow-y-scroll m-0 p-0 bottom-0 absolute scroll-hidden">
        {/* Non-scrollable section BOOKSHELF */}
        <ul
          className="flex w-max items-baseline min-w-[100vw] px-4"
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

        {/* Scrollable section 1 SHELF BOTTOM */}
        <div
          className="h-[50px] flex items-center"
          style={{
            width: `${containerRef.current?.scrollWidth || 0}px`, // Sync the width with the scrollable content
            // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
            backgroundImage: `url(/images/wood.jpg)`, // local env
          }}
          onMouseOver={() => handleScroll(false)}
        >
          <Settings
            // inputRef={inputRef}
            books={books}
            setBooks={setBooks}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleShuffleBooks={handleShuffleBooks}
            // searchQuery={searchQuery}
            // setSearchQuery={setSearchQuery}
            // bookSizeMultiplier={bookSizeMultiplier}
            // setBookSizeMultiplier={setBookSizeMultiplier}
          />
        </div>

        {/* Scrollable section 2 ABOUT SECTION */}
        <About ref={targetDivRef} isScrollable={isScrollable} />
      </section>
    </>
  );
}
