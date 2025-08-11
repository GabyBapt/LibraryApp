import React, { useContext } from "react";
import { BookContext } from "../context/bookContext.jsx";

export default function LibraryContent({ selectedFolder, searchTerm }) {
  const { books } = useContext(BookContext);

  const filteredBooks = books.filter((book) => {
    const matchesFolder =
      selectedFolder === "all" ? true : book.status === selectedFolder;
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <main className="flex-1 p-5 relative">
        <h1 className="text-2xl font-bold mb-4">List of Books</h1>
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
          id="bookGrid"
        >
          {filteredBooks.map((book, idx) => (
            <BookTile
              key={idx}
              bookData={book}
            />
          ))}
        </div>
    </main>
  );
}