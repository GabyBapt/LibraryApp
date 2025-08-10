import { useState } from "react";
import BookCard from "./components/bookCard.jsx";
import AddMenu from "./pages/addChoices.jsx";

const FOLDERS = [
  { label: "All Books", value: "all" },
  { label: "To Read", value: "unread" },
  { label: "Reading", value: "reading" },
  { label: "Completed", value: "completed" },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");

  const filteredBooks = books.filter((book) => {
    const matchesFolder =
      selectedFolder === "all" ? true : book.status === selectedFolder;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-[300px] shadow-[2px_0_5px_rgba(0,0,0,0.1)] p-5 bg-[#f4f4f4]">
        <h2 className="font-bold text-2xl mt-0 mb-3.5">Folders</h2>
        <ul className="p-0 list-none">
          {FOLDERS.map((folder) => (
            <li
              key={folder.value}
              aria-current={
                selectedFolder === folder.value ? "page" : undefined
              }
              className={`cursor-pointer p-2.5 rounded ${
                selectedFolder === folder.value ? "font-bold bg-[#ddd]" : ""
              }`}
              onClick={() => setSelectedFolder(folder.value)}
            >
              {folder.label}
            </li>
          ))}
        </ul>

        <h2 className="mt-5 font-bold">Filters</h2>
        <input
          type="text"
          id="search"
          placeholder="Search by title, author..."
          className="text-5xs border border-gray-300 rounded px-2 py-1 mt-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-5 relative">
        <h1 className="text-2xl font-bold mb-4">List of Books</h1>
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
          id="bookGrid"
        >
          {filteredBooks.map((book, idx) => (
            <BookCard
              key={idx}
              picture={book.picture}
              title={book.title}
              author={book.author}
              status={book.status}
              isbn={book.isbn}
            />
          ))}
        </div>

        {/* Remplace le bouton par AddMenu */}
        <div className="select-none fixed bottom-5 right-5">
          <AddMenu open={open} setOpen={setOpen} setBooks={setBooks} />
        </div>
      </main>

    </div>
  );
}