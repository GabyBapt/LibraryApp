/* FEATURE MAP: LibraryContent
 * Files: libraryContent.jsx, bookTile.jsx, bookContext.jsx
 * Store: BookContext (books)
 * Dependencies: react
 * Related: App, BookTile
 *
 * CRITICAL: This component is responsible for displaying the list of books. It receives the filtered books from the App component and renders them using the BookTile component.
 */
import { BookContext } from "../context/bookContext.jsx";
import BookTile from "../components/bookTile.jsx";


export default function LibraryContent({ books }) {


  return (

    <main className="flex-1 p-5 relative">
        <h1 className="text-2xl font-bold mb-4">List of Books</h1>
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
          id="bookGrid"
        >
          {books.map((book, idx) => {
            return (
              <BookTile
                key={idx}
                bookData={book}
              />
            );
          })}
        </div>
    </main>
  );
}