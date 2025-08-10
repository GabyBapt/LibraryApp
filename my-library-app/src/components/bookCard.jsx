export default function BookCard({picture, title, author, status, isbn }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-700">{author}</p>
      <p className="text-sm italic text-gray-500">{status}</p>
      {isbn && <p className="text-sm text-gray-400">ISBN: {isbn}</p>}
    </div>
  );
}