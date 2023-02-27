import {booksReducer} from './books-reducer';
import { bookReducer } from './book-data-reducer';
import {registrationReducer} from './registration-reducer';
import { userReducer } from './user-reducer';

export const rootReducer = {
  books: booksReducer,
  bookData: bookReducer,
  registration: registrationReducer,
  userData:userReducer
};
