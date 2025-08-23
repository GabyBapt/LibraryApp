import { useRef, useEffect, useState } from "react";
import BookModal from "./bookModal.jsx";


export default function AddMenu({ open, setOpen }) {
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
        className="bg-gray-600 text-white text-2xl rounded-2xl w-[50px] h-[50px] flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        +
      </button>

      {/* Menu flottant */}
      {open && (
        <div
          ref={menuRef}
          className="py-3 bg-gray-100 absolute right-15 bottom-0 mt-2 w-56 backdrop-blur-md rounded-xl shadow-lg overflow-hidden z-50"
        >
          <div className="px-4 py-2 text-gray-700 font-semibold">
            Ajouter un livre
          </div>
          <hr class="h-1  bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            Scanner un code-barres
          </button>
          <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            Rechercher en ligne
          </button>
          <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <button className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
            Saisir l'ISBN
          </button>
          <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <button
            className="w-full flex items-center px-4 pt-2 hover:bg-gray-100"
            onClick={() => setShowModal(true)}
          >
            Ajouter manuellement
          </button>
        </div>
      )}
       {/* Modal */}
        {showModal && (
            <BookModal mode={"add"} onClose={() => setShowModal(false)} />
    )}
    </div>
  );
}