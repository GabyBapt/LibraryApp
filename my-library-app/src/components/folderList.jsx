
import { useEffect, useState, useRef } from "react";

export default function FilterList({ selectedFolder, setSelectedFolder }) {
  const [folders, setFolders] = useState([
    { label: "All Books", value: "all", editable: false },
    { label: "To Read", value: "unread", editable: false },
    { label: "Reading", value: "reading", editable: false },
    { label: "Completed", value: "completed", editable: false },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  // Fermer le menu si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleAddFolder() {
    const newFolder = { label: "", value: "new-folder-" + Date.now(), editable: true };
    setFolders((prev) => [...prev, newFolder]);
    setEditingIndex(folders.length);
  }

  function handleNameSubmit(index, newName) {
    const updated = [...folders];
    updated[index] = {
      ...updated[index],
      label: newName.trim() || "New Folder",
    };
    setFolders(updated);
    setEditingIndex(null);
  }

  return (
    <div>
      <div className="flex justify-between mb-3.5">
        <h2 className="font-bold text-2xl mt-0">Folders</h2>
        <button
          className="select-none p-1 text-blue-400 active:bg-gray-300 active:opacity-45 rounded"
          onClick={handleAddFolder}
        >
          New +
        </button>
      </div>
      <ul className="p-0 list-none">
        {folders.map((folder, index) => (
          <li
            key={folder.value}
            aria-current={selectedFolder === folder.value ? "page" : undefined}
            className={`flex items-center justify-between p-2.5 rounded ${
              selectedFolder === folder.value ? "font-bold bg-[#ddd]" : ""
            }`}
            onClick={() => setSelectedFolder(folder.value)}
          >
            {editingIndex === index ? (
              <input
                ref={inputRef}
                type="text"
                placeholder="Folder Name"
                defaultValue={folder.label}
                onBlur={(e) => handleNameSubmit(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNameSubmit(index, e.target.value);
                  }
                }}
                className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{folder.label}</span>
            )}

            {/* Bouton menu contextuel */}
            {folder.editable && (
              <div className="relative text-2 m-0" ref={menuRef}>
                <button
                  className="text-gray-500 hover:text-gray-700 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpenIndex(menuOpenIndex === index ? null : index);
                  }}
                >
                  ⋮
                </button>

                {/* Menu */}
                {menuOpenIndex === index && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingIndex(index);
                        setMenuOpenIndex(null);
                      }}
                    >
                        Rename
                    </button>
                    <button
                      className="bg-red-500 w-full text-left px-3 py-1 rounded-b text-sm hover:bg-gray-100 text-red-1000"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolders(folders.filter((_, i) => i !== index));
                        setMenuOpenIndex(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}