import React from 'react';
import { Book } from '../utils/Types';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-600">{book.year}</p>
          </div>
          <div className="space-x-2">
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

export default BookList;
