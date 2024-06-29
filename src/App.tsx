import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import Books from './components/Books';
import Pagination from './components/Pagination';
import { bookReducer } from './components/BookReducer';
import { Book, NewBook } from './utils/Types';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(bookReducer, []);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://chachaapi.onrender.com/books');
        console.log('Fetched books:', response.data);
        dispatch({ type: 'SET_BOOKS', payload: response.data });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleAddOrUpdateBook = async (book: Book | NewBook) => {
    try {
      if (currentBook) {
        // Update existing book
        console.log('Updating book:', book);
        const updatedBook = { ...book, id: currentBook.id };
        await axios.put(`https://chachaapi.onrender.com/books/${currentBook.id}`, updatedBook);
        dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
        setCurrentBook(null); // Clear current book after update
      } else {
        // Add new book
        console.log('Adding new book:', book);
        const response = await axios.post('https://chachaapi.onrender.com/books', book);
        const newBook = { ...book, id: response.data.id };
        dispatch({ type: 'ADD_BOOK', payload: newBook });
      }
    } catch (error:any) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`https://chachaapi.onrender.com/books/${id}`);
      dispatch({ type: 'DELETE_BOOK', payload: id }); // Use id directly in payload
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredBooks = state.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.year.toString().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl text-blue-800 font-bold mb-4">Chacha's Novel Nest</h1>
        <BookForm onSubmit={handleAddOrUpdateBook} book={currentBook} />
        <input
          type="text"
          placeholder="Search by title, author, or year"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded my-4"
        />
        <Books books={currentBooks} onEdit={handleEditBook} onDelete={handleDeleteBook} />
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default App;
