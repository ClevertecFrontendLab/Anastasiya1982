import {booksReducer} from './books-reducer';
import { bookReducer } from './book-data-reducer';

export const rootReducer = {
  books: booksReducer,
  bookData: bookReducer
};
