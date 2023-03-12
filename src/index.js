import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Layout } from './pages/routs/layout/layout';
import { LayoutMainPage } from './pages/routs/layout-main-page/layout-main-page';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import { RegistrationPage } from './pages/auth/registration/registration';
import { AuthPage } from './pages/auth/auth';
import { ForgotPassPage } from './pages/auth/forgot-pass/forgot-pass';
import { ViewCardsContextProvider } from './context/view-cards-context';
import { RequireAuth } from './pages/routs/require-auth';

import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ViewCardsContextProvider>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/' element={<Navigate to='books/all' />} />
              <Route path='books/:category' element={<MainPage />} />
              <Route path='/books/terms' element={<TermsPage contentView='terms' />} />
              <Route path='books/contract' element={<TermsPage contentView='contract' />} />
            </Route>
            <Route path='books/:category/:booksId' element={<BookPage />} />
          </Route>
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/forgot-pass' element={<ForgotPassPage />} />
        </Routes>
      </HashRouter>
    </ViewCardsContextProvider>
  </Provider>
);
