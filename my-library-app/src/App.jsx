/* FEATURE MAP: App
 * Files: App.jsx, sideBar.jsx, libraryContent.jsx, addChoices.jsx, bookContext.jsx
 * Store: BookContext (books, setBooks)
 * Dependencies: react
 * Related: SideBar, LibraryContent, AddMenu
 *
 * CRITICAL: This is the main component that holds the state for the search term and the selected folder. It filters the books based on these states and passes the filtered books to the LibraryContent component.
 */
import { useState, useContext } from "react";
import AddMenu from "./pages/addChoices.jsx";
import SideBar from "./pages/sideBar.jsx";
import LibraryContent from "./pages/libraryContent.jsx";
import { BookContext } from "./context/bookContext.jsx";




export default function App() {
  const [open, setOpen] = useState(false);
  const { books, setBooks } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");

  const filteredBooks = books.filter((book) => {
    const matchesFolder =
      (selectedFolder === "all" || selectedFolder ==="") ? true : (book.status === selectedFolder || book.folderId === selectedFolder);
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (

    <div className="h-screen flex">
      {/* Sidebar */}
      <SideBar
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterChange={({ selectedFolder, searchTerm }) => {
          setSelectedFolder(selectedFolder);
          setSearchTerm(searchTerm);
        }}
      />

      {/* Main content */}
      <LibraryContent books={filteredBooks} />
      {/* Add menu flottant */}
      <div className="p-5 select-none fixed bottom-5 right-5">
        <AddMenu open={open} setOpen={setOpen} setBooks={setBooks} />
      </div>
    </div>
  );
}