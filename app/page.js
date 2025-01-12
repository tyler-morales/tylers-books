"use client";

import Book from "./Book";
import { useEffect, useState, useCallback, useRef } from "react";
import About from "./components/about";
import Plaque from "./components/Plaque";
import Settings from "./components/Settings";

export default function Home() {
  const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";

  const containerRef = useRef(null);
  const dragableRef = useRef(null);
  const inputRef = useRef("");

  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({ title: "asc", dateFinished: "asc", year: "asc" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  // Create state that sets bookSizeMultiplier to 5 when on small screens and 4 to larger screens
  const [bookSizeMultiplier, setBookSizeMultiplier] = useState(4);

  // Update book size
  useEffect(() => {
    // Update book size multiplier after mounting
    const handleResize = () => {
      setBookSizeMultiplier(window.innerWidth < 640 ? 5 : 4);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get books (data)
  useEffect(() => {
    async function fetchBooks() {
      console.log("Base Path:", process.env.NEXT_PUBLIC_BASE_PATH || "/");
      console.log("API Base Path:", process.env.NEXT_PUBLIC_API_BASE_PATH);
      try {
        const response = await fetch(`${apiBasePath}/books.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  const handleShuffleBooks = useCallback(() => {
    setBooks([...books].sort(() => Math.random() - 0.5)); // random shuffle
  }, [books]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBook = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
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

  // Set search query equal to the user's input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStateChange = () => {
    setIsAboutVisible(!isAboutVisible);
  };

  useEffect(() => {
    const ele = dragableRef.current;
    ele.style.cursor = "grab";

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      // const dy = e.clientY - pos.y;

      // Scroll the element
      // ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener("mousedown", mouseDownHandler);

    // Cleanup event listeners on component unmount
    return () => {
      ele.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
        }}
        className="relative shadow-lg z-10 flex gap-2 flex-wrap px-2 items-center justify-center sm:justify-start sm:gap-4 sm:h-[40px] py-2 sm:p-0"
      >
        <Plaque target={containerRef} />
        {/* Search bar */}
        <input
          ref={inputRef}
          data-cursor-type="pencil"
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="sunken w-full border-b-2 border-green-400 focus:border-b-2 outline-blue-500 placeholder:text-orange-300 font-black text-white rounded-md px-2 py-1 sm:w-72"
        />
      </nav>

      {/* Bookcase */}
      <section
        ref={dragableRef}
        className="max-h-[750px] w-screen m-0 p-0 bottom-[51px] absolute scroll-hidden"
      >
        <ul className="flex w-max items-baseline min-w-[100vw] px-4">
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
          backgroundImage: `url(${apiBasePath}/images/wood.jpg)`,
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
