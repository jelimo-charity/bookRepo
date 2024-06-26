import { useRef, FormEvent } from 'react';
import { Book } from '../utils/Types';
interface BookFormProps {
  onSubmit: (book: Book) => void;
  book?: Book | null;
}

const BookForm: React.FC<BookFormProps> =({ onSubmit, book }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: book ? book.id : Date.now(),
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      year: yearRef.current?.value || '',
    };
    onSubmit(newBook);
    if (titleRef.current) titleRef.current.value = '';
    if (authorRef.current) authorRef.current.value = '';
    if (yearRef.current) yearRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        ref={titleRef} 
        defaultValue={book ? book.title : ''} 
        placeholder="Title" 
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input 
        ref={authorRef} 
        defaultValue={book ? book.author : ''} 
        placeholder="Author" 
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input 
        ref={yearRef} 
        defaultValue={book ? book.year : ''} 
        placeholder="Year" 
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button 
        type="submit" 
        className="w-full   p-2 bg-blue-500 text-white rounded hover:bg-blue-600  "
      >
        {book ? 'Update' : 'Add'} Book
      </button>
    </form>
  );
};

export default BookForm;
