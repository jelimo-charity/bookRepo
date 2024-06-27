import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import Books from './components/Books';
import { bookReducer } from './components/BookReducer';
import { Book } from './utils/Types';
// import './App.css'
const App: React.FC = () => {
  const [state, dispatch] = useReducer(bookReducer, []);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://chachaapi.onrender.com/books');
        dispatch({ type: 'SET_BOOKS', payload: response.data });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleAddOrUpdateBook = async (book: Book) => {
    if (currentBook) {
      try {
        await axios.put(`https://chachaapi.onrender.com/books/${book.id}`, book);
        dispatch({ type: 'UPDATE_BOOK', payload: book });
        setCurrentBook(null);
      } catch (error) {
        console.error('Error updating book:', error);
      }
    } else {
      try {
        const response = await axios.post('https://chachaapi.onrender.com/books', book);
        dispatch({ type: 'ADD_BOOK', payload: { ...book, id: response.data.msg.id } });
      } catch (error) {
        console.error('Error adding book:', error);
      }
    }
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`https://chachaapi.onrender.com/books/${id}`);
      dispatch({ type: 'DELETE_BOOK', payload: { id } as Book });
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = state.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.year.toString().includes(searchTerm)
  );

  return (
    <div className="max-w-2xl mx-auto p-4  min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Book Repository</h1>
        <BookForm onSubmit={handleAddOrUpdateBook} book={currentBook} />
        <input
          type="text"
          placeholder="Search by title, author, or year"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded my-4"
        />
        <Books books={filteredBooks} onEdit={handleEditBook} onDelete={handleDeleteBook} />
      </div>
    </div>
  );
};

export default App;
