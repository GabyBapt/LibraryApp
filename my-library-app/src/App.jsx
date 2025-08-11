import { useState } from "react";
import AddMenu from "./pages/addChoices.jsx";
import SideBar from "./pages/sideBar.jsx";
import LibraryContent from "./pages/libraryContent.jsx";
import { BookProvider } from "./context/bookContext.jsx";


export default function App() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");



  const filteredBooks = books.filter((book) => {
    const matchesFolder =
      selectedFolder === "all" ? true : book.status === selectedFolder;
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <BookProvider>
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
      <LibraryContent
       books={filteredBooks}

       />
        {/* Add menu flottant */}
        <div className="p-5 select-none fixed bottom-5 right-5">
         
           <AddMenu open={open} setOpen={setOpen} setBooks={setBooks} />
          
        </div>
    </div>
    </BookProvider>
  );
}