import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Layout } from './pages/routs/layout/layout';
import { LayoutMainPage } from './pages/routs/layout-main-page/layout-main-page';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import { ViewCardsContextProvider } from './context/view-cards-context';

import {store} from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
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
          </Routes>
        </HashRouter>
      </ViewCardsContextProvider>
    </React.StrictMode>
  </Provider>
);
