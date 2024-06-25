import { BookAction, Book } from '../utils/Types';

export const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case 'DELETE_BOOK':
      return state.filter((book) => book.id !== action.payload.id);
    default:
      return state;
  }
};
