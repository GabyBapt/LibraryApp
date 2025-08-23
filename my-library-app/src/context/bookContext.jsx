/* FEATURE MAP: BookContext
 * Files: bookContext.jsx, bookModel.jsx
 * Store: N/A (this is the store)
 * Dependencies: react
 * Related: App, BookModal
 *
 * CRITICAL: This is the main context for the application. It holds the list of books and provides functions to add and update books.
 */
// src/context/BookContext.jsx
import React, { createContext, useState } from "react";
import { baseBook } from "../models/bookModel.js";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  // Ajouter un nouveau livre basé sur baseBook + données fournies
  const addBook = (bookData) => {
    const newBook = { ...baseBook, ...bookData, id: "book-" + Date.now() }
    setBooks((prev) => [...prev, newBook]);
  };

  // Modifier un livre existant (index ou id selon ta gestion)
  const updateBook = (bookId, newData) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, ...newData } : book))
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
}

