export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

export type NewBook = Omit<Book, 'id'>;

  
  export interface BookAction {
    type: 'ADD_BOOK' | 'UPDATE_BOOK' | 'DELETE_BOOK';
    payload: Book;
  }
  
 
