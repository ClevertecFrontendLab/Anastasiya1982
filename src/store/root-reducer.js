import {booksReducer} from './books-reducer';
import { bookReducer } from './book-data-reducer';
import {registrationReducer} from './registration-reducer';

export const rootReducer = {
  books: booksReducer,
  bookData: bookReducer,
  registration: registrationReducer,
};
