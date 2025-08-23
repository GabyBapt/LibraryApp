import { useEffect, useState, useRef, useContext } from "react";
import { FolderContext } from "../context/folderContext.jsx";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function FilterList({ selectedFolder, setSelectedFolder }) {
  // 1. On récupère TOUTE la logique et les données depuis le contexte
  const { folders, categories, addFolder, deleteFolder, renameFolder } = useContext(FolderContext);

  // 2. Seul l'état d'UI reste ici
  const [editingIndex, setEditingIndex] = useState(null); // On pourrait même passer à editingId
  const inputRef = useRef(null);
  // menuRef et menuOpenIndex sont aussi des états d'UI et restent ici

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  // La fonction handleAddFolder appelle le contexte et gère l'état d'UI
  const handleAddFolder = () => {
    const newFolderId = addFolder();
    setEditingIndex(newFolderId); // On passe l'id du nouveau dossier

    // Idéalement, on voudrait que le nouvel item passe en mode édition
    // C'est un point plus avancé, pour l'instant on se contente d'ajouter
  }

  // 3. La logique de renommage a disparu d'ici
  // ...

  return (
    <div>
      {/* Affichage des Catégories (depuis le contexte) */}
      <h2 className="font-bold text-2xl mt-0 pb-2">Categories</h2>
      <ul className="p-0 list-none">
        {categories.map((cat) => (
          <li key={cat.value}
            aria-current={selectedFolder === cat.value ? "page" : undefined}
            className={`flex items-center justify-between p-2 gap-2 rounded ${
              selectedFolder === cat.value ? "font-bold bg-[#ddd]" : ""
            }`}
            onClick={() => setSelectedFolder(cat.value)}>
            <span >{cat.label}</span>
          </li>
        ))}
      </ul>

      {/* Affichage des Dossiers (depuis le contexte) */}
      <div className="flex justify-between mt-5 mb-3.5">
        <h2 className="font-bold text-2xl mt-0">Folders</h2>
        <button className="blue-text-btn" onClick={handleAddFolder}>
          New +
        </button>
      </div>
      <ul className="p-0 list-none">
        {folders.map((folder) => ( // Note: on n'utilise plus l'index
          <li
            key={folder.id}
            aria-current={selectedFolder === folder.id ? "page" : undefined}
            className={`flex items-center justify-between p-2.5 rounded ${
              selectedFolder === folder.id ? "font-bold bg-[#ddd]" : ""
            }`}
            onClick={() => setSelectedFolder(folder.id)}
          >
            {editingIndex === folder.id ? ( // On compare par id
              <input
                ref={inputRef}
                defaultValue={folder.label}
                onBlur={(e) => {
                  renameFolder(folder.id, e.target.value); // 4. On appelle la fonction du contexte
                  setEditingIndex(null); // On gère l'état d'UI
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameFolder(folder.id, e.target.value);
                    setEditingIndex(null);
                  }
                }}
                // ...
              />
            ) : (
              <span onClick={() => setSelectedFolder({ type: 'folder', value: folder.id })}>{folder.label}</span>
            )}

            {folder.editable && (
              <FolderEditMenu
                onEdit={() => setEditingIndex(folder.id)} // On passe la fonction pour gérer l'état d'UI
                onDelete={() => deleteFolder(folder.id)}   // On passe la fonction du contexte
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Ce composant enfant reçoit maintenant des fonctions en props
function FolderEditMenu({ onDelete, onEdit }) {
  return (
    <Menu>
      <MenuButton className="select-none">⋮</MenuButton>
      <MenuItems anchor="right end" className="select-none bg-gray-100 hover:bg-gray-600 rounded p-3 [--anchor-gap:--spacing(2)]">
        <MenuItem>
          <button className="block text-[1.2rem]" onClick={onEdit}>
            Rename
          </button>
        </MenuItem>
        <MenuItem>
          <button className="block text-[1.2rem]" onClick={onDelete}>
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
