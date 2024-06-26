// src/App.tsx
import React, { useReducer, useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import Books from './components/Books';
import { bookReducer } from './components/BookReducer';
import BooksLocale from './components/BooksLocale';
import { Book } from './utils/Types';

const App: React.FC = () => {
  const [books, setBooks] = BooksLocale<Book[]>('books', []);
  const [state, dispatch] = useReducer(bookReducer, books);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    setBooks(state);
  }, [state, setBooks]);

  const handleAddOrUpdateBook = (book: Book) => {
    if (currentBook) {
      dispatch({ type: 'UPDATE_BOOK', payload: book });
      setCurrentBook(null);
    } else {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
  };

  const handleDeleteBook = (id: number) => {
    dispatch({ type: 'DELETE_BOOK', payload: { id } as Book });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Repository</h1>
      <BookForm onSubmit={handleAddOrUpdateBook} book={currentBook} />
      <Books books={state} onEdit={handleEditBook} onDelete={handleDeleteBook} />
    </div>
  );
};

export default App;
