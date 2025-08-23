
import React, { useState } from "react";

export default function AddBook({ setBooks, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("unread");
  const [isbn, setIsbn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks((prev) => [
      ...prev,
      { title, author, status, isbn }
    ]);
    onClose();
  };

  return (
    <div
      className="flex fixed inset-0 bg-black/50 justify-center items-center"
      id="modal"
    >
      <form
        onSubmit={handleSubmit}
        className=" bg-white px-5 pb-5 rounded w-[300px] flex flex-col gap-5"
      >
        <div className=" pt-3 flex top-0 items-center justify-between">
          
          <span
            className="cursor-pointer text-xl"
            id="closeModal"
            onClick={onClose}
          >
            &times;
<h2 className="text-lg font-bold">Add New Book</h2>          </span>
        </div>
        <input
          type="text"
          id="title"
          placeholder="Book Title"
          className="border border-gray-300 rounded px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="author"
          placeholder="Author"
          className="border border-gray-300 rounded px-2 py-1"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          id="isbn"
          placeholder="ISBN (optional)"
          className="border border-gray-300 rounded px-2 py-1"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <select
          id="status"
          className="border border-gray-300 rounded px-2 py-1"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="unread">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>
        <button
          id="saveBook"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}