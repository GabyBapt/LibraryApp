// src/context/BookContext.jsx
import React, { createContext, useState } from "react";
import { baseBook } from "../models/bookModel";

export const BookContext = createContext();


export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  // Ajouter un nouveau livre basé sur baseBook + données fournies
  const addBook = (bookData) => {
    setBooks((prev) => [...prev, { ...baseBook, ...bookData }]);
  };

  // Modifier un livre existant (index ou id selon ta gestion)
  const updateBook = (index, newData) => {
    setBooks((prev) =>
      prev.map((book, i) => (i === index ? { ...book, ...newData } : book))
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
}

