import React from 'react';
import { Book } from '../utils/Types';

interface BooksProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const Books: React.FC<BooksProps> = ({ books, onEdit, onDelete }) => {
  return (
    <table className="w-full bg-white shadow-lg rounded-lg mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Author</th>
          <th className="p-2 border">Year</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="text-center">
            <td className="p-2 border">{book.title}</td>
            <td className="p-2 border">{book.author}</td>
            <td className="p-2 border">{book.year}</td>
            <td className="p-2 border">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Books;
