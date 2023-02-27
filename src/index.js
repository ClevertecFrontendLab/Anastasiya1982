import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Layout } from './pages/routs/layout/layout';
import { LayoutMainPage } from './pages/routs/layout-main-page/layout-main-page';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import {RegistrationPage} from './pages/registration/registration';
import { ViewCardsContextProvider } from './context/view-cards-context';

import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ViewCardsContextProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='books/all' />} />
              <Route path='/books/' element={<Navigate to='all' />} />
              <Route path='books/:category' element={<MainPage />} />
              <Route path='/books/terms' element={<TermsPage contentView='terms' />} />
              <Route path='books/contract' element={<TermsPage contentView='contract' />} />
            </Route>
            <Route path='books/:category/:booksId' element={<BookPage />} />
          </Route>
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
      </HashRouter>
    </ViewCardsContextProvider>
  </Provider>
);
