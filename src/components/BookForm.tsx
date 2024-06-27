import React, { useRef, FormEvent, useEffect } from 'react';
import { Book } from '../utils/Types';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  book?: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, book }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book) {
      if (titleRef.current) titleRef.current.value = book.title;
      if (authorRef.current) authorRef.current.value = book.author;
      if (yearRef.current) yearRef.current.value = book.year.toString();
    } else {
      if (titleRef.current) titleRef.current.value = '';
      if (authorRef.current) authorRef.current.value = '';
      if (yearRef.current) yearRef.current.value = '';
    }
  }, [book]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: book ? book.id : Date.now(),
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      year: parseInt(yearRef.current?.value || '0', 10),
    };
    onSubmit(newBook);
    if (!book) {
      if (titleRef.current) titleRef.current.value = '';
      if (authorRef.current) authorRef.current.value = '';
      if (yearRef.current) yearRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        ref={titleRef}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        ref={authorRef}
        placeholder="Author"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        ref={yearRef}
        placeholder="Year"
        type="number"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-800 text-white rounded hover:bg-blue-600"
      >
        {book ? 'Update' : 'Add'} Book
      </button>
    </form>
  );
};

export default BookForm;
