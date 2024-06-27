import { Book } from '../utils/Types';

interface BookAction {
  type: string;
  payload: Book | Book[];
}

export const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.payload as Book[];
    case 'ADD_BOOK':
      console.log('Adding book to state:', action.payload); // Debugging log
      return [...state, action.payload as Book];
    case 'UPDATE_BOOK':
      return state.map(book => (book.id === (action.payload as Book).id ? action.payload as Book : book));
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== (action.payload as Book).id);
    default:
      return state;
  }
};
