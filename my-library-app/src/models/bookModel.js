/* FEATURE MAP: BookModel
 * Files: bookModel.js
 * Store: N/A
 * Dependencies: N/A
 * Related: bookContext.jsx
 *
 * CRITICAL: This file defines the base structure of a book object. It is used in the BookContext to create new books.
 */
// src/models/bookModel.js
export const baseBook = {
  id: null, // Indispensable !
  title: "",
  author: "",
  // Les "Catégories" sont un état interne au livre
  status: "unread", // 'unread', 'reading', 'completed'
  // Le "Dossier" est une association, qui peut être nulle
  folderId: null, // L'ID du dossier personnalisé auquel il appartient
  notes: "",
  cover: "",
};

// On peut aussi créer un modèle pour les dossiers
export const baseFolder = {
    id: null,
    name: ""
}

