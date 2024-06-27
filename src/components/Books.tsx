import React from 'react';
import { Book } from '../utils/Types';

interface BooksProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const Books: React.FC<BooksProps> = ({ books, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">{book.title}</h2>
          <p className="text-gray-700">{book.author}</p>
          <p className="text-gray-500">{book.year}</p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => onEdit(book)}
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
