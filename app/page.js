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

  return (
    <>
      <Settings
        inputRef={inputRef}
        sortBooks={sortBooks}
        sortOrder={sortOrder}
        handleShuffleBooks={handleShuffleBooks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookSizeMultiplier={bookSizeMultiplier}
        setBookSizeMultiplier={setBookSizeMultiplier}
      />

      <section className="w-full max-h-[740px] overflow-y-scroll m-0 p-0 bottom-0 absolute scroll-hidden">
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
          className="h-[40px] flex items-center"
          style={{
            width: `${containerRef.current?.scrollWidth || 0}px`, // Sync the width with the scrollable content
            // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
            backgroundImage: `url(/images/wood-texture.png)`, // local env
          }}
          onMouseOver={() => handleScroll(false)}
        >
          {/* Plaque */}
          <Plaque target={targetDivRef} />
        </div>

        {/* Scrollable section 2 ABOUT SECTION */}
        <About ref={targetDivRef} isScrollable={isScrollable} />
      </section>
    </>
  );
}
