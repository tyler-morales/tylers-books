"use client";

import Book from "./Book";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const inputRef = useRef("");

  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({ title: "asc", dateFinished: "asc", year: "asc" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/books.json");
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

  return (
    <section className="overflow-y-hidden h-[100vh] w-[100vw] overflow-hidden">
      <h1 className="text-center">My Bookshelf</h1>

      {/* buttons */}
      <div className="flex gap-2">
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
          onClick={handleShuffleBooks}
          className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
        >
          🔀
        </button>
        {/* Search box */}
        <div className="">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2 py-1 w-72"
          />
        </div>
      </div>

      {/* Bookshelf */}
      <ul
        className="flex relative border-b-[12px] border-orange-900 mt-10 w-full min-w-[600px] overflow-x-auto  min-h-[667px] items-baseline"
        ref={containerRef}
      >
        <AnimatePresence>
          {filteredBooks.map((book, index) => (
            <Book
              key={book.id}
              data={book}
              isSelected={selectedBook === book}
              onSelect={handleSelectBook}
              isAnyHovered={hoveredBook !== null}
              onHover={setHoveredBook}
              style={{
                transform: `translateX(${index * 100}px)`,
              }}
            />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
