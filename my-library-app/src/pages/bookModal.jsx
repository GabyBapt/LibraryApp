/* FEATURE MAP: BookModal
 * Files: bookModal.jsx, bookContext.jsx
 * Store: BookContext (addBook)
 * Dependencies: react
 * Related: AddMenu, BookTile
 *
 * CRITICAL: This component is used to add, edit, or view book details. It uses the BookContext to add a new book to the library. The mode prop determines the behavior of the modal.
 */
import React, { useState, useContext, useEffect } from "react";
import { BookContext } from "../context/bookContext.jsx";
import OpenFolderChoiceModal from "../components/folderChoiceModal.jsx";
import { FolderContext } from "../context/folderContext.jsx";

export default function BookModal({mode: initialMode, onClose, bookData}) {
  const { addBook, updateBook } = useContext(BookContext);

  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");
  const [RightButton, setRightButton] = useState("");
  const [openFolderChoiceModal, setOpenFolderChoideModal] = useState(false);
  useEffect(() =>{
      setMessage(
      {
        "add": "Add a new book",
        "edit": "Edit book details",
        "view": "View book details"
      }[mode] || "Unknown mode"
      );
      setRightButton(
      {
        "add": "Add",
        "edit": "Save",
        "view": "Modify"
      }[mode] || "Unknown mode"
      );
  }, [mode]);

  const [title, setTitle] = useState(bookData?.title || "");
  const [author, setAuthor] = useState(bookData?.author || "");
  const [status, setStatus] = useState(bookData?.status || "unread");
  const [isbn, setIsbn] = useState(bookData?.isbn || "");
  const [notes, setNotes] = useState(bookData?.notes || "");
  const [folderId, setFolderId] = useState(bookData?.folderId || null);
  const id = bookData?.id || null;



  // --- FIN de la fonction, on ferme la déclaration avant le return ---

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add"){
      addBook({ title, author, status, isbn, notes});
    }
    else if (mode === "edit"){
      updateBook(id, { title, author, status, isbn, notes})

    }
    else if (mode === "view"){
      setMode("edit");
      return;
    }
    onClose();
  };


  return (
    <div
      className="flex fixed inset-0 bg-black/50 justify-center items-center"
      id="modal"
    >
      <form
        onSubmit={handleSubmit}
        className="h-8/10 overflow-auto scroll overscroll-contain bg-white pb-5 rounded w-[500px]"
      >
        <div className="sticky bg-gray-200 p-3 flex top-0 h-max items-center justify-between">
          <button
            className="blue-text-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <h2 className="text-l font-bold">{message}</h2>
          <button className="blue-text-btn" type="submit">
            {RightButton}
          </button>
        </div>
        <div className="flex flex-col gap-5 px-5 pt-3">
         <div className="flex-col flex">
          <h2 className="text-lg font-bold pb-2">Titre</h2>
          <InputSlot  mode={mode} required={true} type={"text"} value={title} placeholder={"Book Title"} setData={(e) => setTitle(e.target.value)}
          />
          </div>
         <div className="flex-col flex">
          <h2 className="text-lg font-bold pb-2">Auteur</h2>
          <InputSlot mode={mode} required={true} type={"text"} value={author} placeholder={"Author"} setData={(e) => setAuthor(e.target.value)}
          />
         </div>
         <div className="flex-col flex">
          <h2 className="text-lg font-bold pb-2">ISBN</h2>
          <InputSlot mode={mode} type={"text"} value={isbn} placeholder={"ISBN (Optional)"} setData={(e) => setIsbn(e.target.value)}
          />
         </div>
         <div className="flex-col flex">
          <h2 className="text-lg font-bold pb-2">Status de lecture</h2>
          <select
            id="status"
            className="border border-gray-300 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={mode === "view"}
          >
            <option value="unread">To Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
         </div>
         <div className="flex-col flex">
          <h2 className="text-lg font-bold pb-2">Notes</h2>
          <InputSlot mode={mode} type={"textarea"} value={notes} placeholder={""} setData={(e) => setNotes(e.target.value)}
          />
         </div>
         <div className ="flex items-center justify-between">
          <button
            type="button" // Très important pour ne pas soumettre le formulaire !
            className="w-7/10 blue-text-btn flex items-center gap-2"
            onClick={() => setOpenFolderChoideModal(prev => !prev)}// <-- On utilise flex pour aligner l'icône et le texte
          >
            {/* Voici l'icône SVG. Elle vient de la librairie Heroicons (créée par l'équipe de Tailwind) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor" // <-- L'astuce magique ! Hérite la couleur du parent.
              className="w-5 h-5" // <-- On définit la taille de l'icône
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
           <span>Ajouter à un dossier</span>
          
          </button>
          <div className="text-gray-300 text-[0.8rem]">Current Folder : {folderId ? folderId : "None"}</div>
          </div>
          {(openFolderChoiceModal &&(
            <OpenFolderChoiceModal
              bookId={id}
              onClose={() => setOpenFolderChoideModal(false)}
            />
          ))}
        </div>
      </form>
    </div>
  );
}


function InputSlot({
  mode,
  type,
  required,
  value,
  placeholder,
  setData,
  className = '' // 1. On accepte une prop className, par défaut une chaîne vide
}) {
  // 2. On prépare les classes pour chaque mode
  const inputClassName = `text-gray-600 border border-gray-300 rounded px-2 py-1 ${className}`; // On ajoute la classe externe ici
  const viewClassName = `text-gray-600 border border-gray-100 font- rounded px-2 py-1 whitespace-pre-wrap ${className}`; // Également ici + gestion du retour à la ligne

  if (mode === "add" || mode === "edit") {
    const commonProps = {
      placeholder,
      className: inputClassName,
      value,
      onChange: setData,
      required: required || false,
    };

    // 3. BONUS : Si le type est 'textarea', on rend un textarea
    if (type === 'textarea') {
      return <textarea {...commonProps} rows="5" />; // On peut ajouter des attributs par défaut
    }

    return <input type={type} {...commonProps} />;
  } else {
    // Le mode "vue"
    return (
      <span className={viewClassName}>
        {value || "empty"}
      </span>
    );
  }
}