import React, { useRef, useEffect, useContext } from 'react';
import { FolderContext } from '../context/folderContext';
import { BookContext } from '../context/bookContext';

// On accepte `onClose` et `bookId` comme props
export default function OpenFolderChoiceModal({ onClose, bookId }) {
  const modalRef = useRef(null); // 1. On crée la ref ICI
  const { folders } = useContext(FolderContext);
  const { updateBook } = useContext(BookContext);

  // 2. Le useEffect pour gérer la fermeture est ICI
  useEffect(() => {
    function handleClickOutside(event) {
      // Si la ref existe ET que le clic n'est PAS à l'intérieur du modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // On appelle la fonction de fermeture passée en prop
      }
    }

    // On ajoute l'écouteur
    document.addEventListener("mousedown", handleClickOutside);
    // On nettoie l'écouteur quand le composant est retiré du DOM
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // La dépendance est onClose

  const handleFolderSelect = (folderId) => {
    updateBook(bookId, { folderId: folderId });
    onClose(); // On ferme le modal après la sélection
  };

  return (
    // 3. On attache la ref à l'élément principal du modal
    <div ref={modalRef} className="relative bg-white shadow-lg rounded-md p-4 border w-56 z-10">
      <h3 className="font-bold mb-2">Choisir un dossier</h3>
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>
            <button 
              className="w-full text-left p-2 hover:bg-gray-100 rounded"
              onClick={() => handleFolderSelect(folder.id)}
            >
              {folder.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}