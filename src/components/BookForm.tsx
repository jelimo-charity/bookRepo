import React, { useState, useEffect } from 'react';
import { Book, NewBook } from '../utils/Types';

interface BookFormProps {
  onSubmit: (book: Book | NewBook) => void;
  book: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, book }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | ''>('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !year) {
      alert('Please fill in all fields');
      return;
    }
    if (typeof year === 'number' && (year < 0 || year > new Date().getFullYear())) {
      alert('Please enter a valid year');
      return;
    }
    const newBook: NewBook = { title, author, year: year as number };
    onSubmit(newBook);
    setTitle('');
    setAuthor('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || '')}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {book ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;
