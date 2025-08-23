import { createContext, useState } from 'react';
// Note: on enlève les imports de BookContext pour l'instant pour se concentrer sur ce fichier
export const FolderContext = createContext();

export function FolderProvider({ children }) {
  // 1. Les catégories statiques vivent ici maintenant
  const [categories, setCategories] = useState([
    { label: "All Books", value: "all", editable: false },
    { label: "To Read", value: "unread", editable: false },
    { label: "Reading", value: "reading", editable: false },
    { label: "Completed", value: "completed", editable: false },
  ]);

  const [folders, setFolders] = useState([
    // Exemple pour voir le résultat
    { id: "folder-1", label: "Science-Fiction", editable: true },
  ]);

  // --- LOGIQUE METIER ---

  const addFolder = () => {
    // On peut lui donner un nom par défaut pour éviter un label vide
    const newFolder = { id: "folder-" + Date.now(), label: "", editable: true };
    setFolders((prev) => [...prev, newFolder]);

    // On pourrait retourner l'id pour que le composant sache lequel éditer
    return newFolder.id;
  };

  const deleteFolder = (folderId) => {
    setFolders(prev => prev.filter(f => f.id !== folderId));
    // Plus tard : appeler la logique pour mettre à jour les livres associés
  };

  // 2. La logique de renommage est maintenant ici et utilise un ID (plus fiable)
  const renameFolder = (folderId, newName) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === folderId
          ? { ...folder, label: newName.trim() || "Dossier sans nom" }
          : folder
      )
    );
  };

  // On expose tout ce dont l'application a besoin
  const value = { folders, categories, addFolder, deleteFolder, renameFolder };

  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  );
}