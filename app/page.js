"use client";

import Book from "./Book";
import { useEffect, useState } from "react";

export default function Home() {
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
    if (selectedBook === book) {
      setSelectedBook(null);
      return;
    }
    setSelectedBook(book);
  };

  const handleShuffleBooks = () => {
    setBooks(shuffleArray([...books]));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
          className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2"
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
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-2 border-gray-600 bg-gray-300 text-black rounded-md px-2 py-1 w-72"
          />
        </div>
      </div>

      {/* Bookshelf */}
      <ul className="flex border-b-[12px] border-orange-900 mt-10 items-baseline w-full">
        {filteredBooks.map((book, index) => (
          <Book
            key={index}
            data={book}
            isSelected={selectedBook === book}
            onSelect={handleSelectBook}
            isAnyHovered={hoveredBook !== null}
            onHover={setHoveredBook}
          />
        ))}
      </ul>
    </section>
  );
}
