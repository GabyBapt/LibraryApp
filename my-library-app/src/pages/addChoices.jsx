import { useRef, useEffect, useState } from "react";
import AddBook from "./addBook";


export default function AddMenu({ open, setOpen, setBooks }) {
  const menuRef = useRef();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

   useEffect(() => {
    if (showModal) {
      setOpen(false);
    }
  }, [showModal, setOpen]);

  return (
    <div className="relative inline-block">
      {/* Bouton + */}
      <button
        className="bg-green-600 text-white text-2xl rounded-2xl w-[50px] h-[50px] flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        +
      </button>

      {/* Menu flottant */}
      {open && (
        <div
          ref={menuRef}
          className="transition ease-in-out absolute right-15 bottom-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden z-50"
        >
          <div className="px-4 py-2 text-gray-500 font-semibold">
            Ajouter un livre
          </div>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            📷 Scanner un code-barres
          </button>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            📋 Scanner des codes-barres
          </button>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            🔍 Rechercher en ligne
          </button>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            ⌨️ Saisir l'ISBN
          </button>
          <button 
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
            onClick={() => setShowModal(true)}
          >
            ✏️ Ajouter manuellement
          </button>
        </div>
      )}
       {/* Modal */}
        {showModal && (
            <AddBook setBooks={setBooks} onClose={() => setShowModal(false)} />
        )}
    </div>
  );
}