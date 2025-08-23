/* FEATURE MAP: SideBar
 * Files: sideBar.jsx, folderList.jsx
 * Store: N/A (receives state from App.jsx)
 * Dependencies: react
 * Related: App, FolderList
 *
 * CRITICAL: This component is responsible for the folder list and the search input. It receives the selected folder and search term from the App component and updates them on user input.
 */
import FolderList from "../components/folderList.jsx";


export default function SideBar({
  selectedFolder,
  setSelectedFolder,
  searchTerm,
  setSearchTerm,
}) {



  return (
    <aside className="w-[300px] shadow-[2px_0_5px_rgba(0,0,0,0.1)] p-5 bg-[#f4f4f4]">

      <FolderList
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        />

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
  );
}
