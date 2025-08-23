/* FEATURE MAP: BookTile
 * Files: bookTile.jsx, bookModal.jsx
 * Store: N/A
 * Dependencies: react
 * Related: LibraryContent, BookModal
 *
 * CRITICAL: This component displays a single book in the library. When clicked, it opens the BookModal in 'view' mode to show the book details.
 */
import BookModal from "../pages/bookModal.jsx";
import { useState} from "react";

export default function BookTile({ bookData }) {
  const [openBookDetails, setOpenBookDetails] = useState(false);

  return (

  <div>
    <button
      onClick={ () => setOpenBookDetails(true) }
      className="border p-4 rounded shadow bg-white text-left w-full hover:shadow-lg transition"
    >
      <h3 className="font-bold text-lg">{bookData.title}</h3>
      <p className="text-gray-700">{bookData.author}</p>
      <p className="text-sm italic text-gray-500">{bookData.status}</p>
      {bookData.isbn && (
        <p className="text-sm text-gray-400">ISBN: {bookData.isbn}</p>
      )}
    </button>

    {openBookDetails && (
                <BookModal mode={"view"} onClose={() => setOpenBookDetails(false)} bookData={bookData} />
        )}
    </div>
  );
}