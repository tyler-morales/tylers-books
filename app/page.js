"use client";

import Book from "./Book";
import { useEffect, useState, useCallback, useRef } from "react";
import About from "./components/about";
import Plaque from "./components/Plaque";
import Settings from "./components/Settings";

export default function Home() {
  const containerRef = useRef(null);
  const inputRef = useRef("");

  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({ title: "asc", dateFinished: "asc", year: "asc" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  // Create state that sets bookSizeMultiplier to 5 when on small screens and 4 to larger screens
  const [bookSizeMultiplier, setBookSizeMultiplier] = useState(window.innerWidth < 640 ? 5 : 4);

  useEffect(() => {
    const handleResize = () => {
      setBookSizeMultiplier(window.innerWidth < 640 ? 5 : 4);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  // Set search query equal to the user's input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStateChange = () => {
    setIsAboutVisible(!isAboutVisible);
  };

  return (
    <>
      <nav
        style={{
          // backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/wood-texture.png)`, // production env
          backgroundImage: "url(/images/wood.jpg)",
        }}
        className="relative shadow-lg z-10 flex gap-2 flex-wrap px-2 items-center justify-center sm:justify-start sm:gap-4 sm:h-[40px] py-2 sm:p-0"
      >
        <Plaque target={containerRef} />
        {/* Search bar */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="sunken w-full border-b-2 border-green-400 focus:border-b-2 outline-blue-500 placeholder:text-orange-300 font-black text-white rounded-md px-2 py-1 sm:w-72"
        />
      </nav>

      {/* Bookcase */}
      <section className="max-h-[750px] w-screen m-0 p-0 bottom-[51px] absolute scroll-hidden">
        <ul className="flex w-max items-baseline min-w-[100vw] px-4" ref={containerRef}>
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
      </section>

      {/* Bottom shelf */}
      <div
        className="h-[50px] flex items-center w-full absolute bottom-0"
        style={{
          backgroundImage: `url(/images/wood.jpg)`, // local env
        }}
      >
        <Settings
          books={books}
          setBooks={setBooks}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          handleShuffleBooks={handleShuffleBooks}
          onStateChange={handleStateChange}
          sharedState={isAboutVisible}
        />
      </div>

      <About isAboutVisible={isAboutVisible} />
    </>
  );
}
