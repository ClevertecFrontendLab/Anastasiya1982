import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { LeftBar } from '../../../components/leftbar/leftbar';
import { getBooksDataAsync, getCategoriesDataAsync } from '../../../store/books-reducer';

import './layout-main-page.scss';

export const LayoutMainPage = () => {
  const dispatch = useDispatch();
  const allBooksInLibrary = useSelector((store) => store.books.booksData);
  const allCategoriesInLibrary = useSelector((store) => store.books.categoriesData);

  const fetchAllBooksinLibrary = useCallback(() => {
    dispatch(getBooksDataAsync());
  }, [dispatch]);

  const fetchAllCategoryiesInLibrary = useCallback(() => {
    dispatch(getCategoriesDataAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!allBooksInLibrary.length) {
      fetchAllBooksinLibrary();
    }
  }, [fetchAllBooksinLibrary, allBooksInLibrary]);

  useEffect(() => {
    if (!allCategoriesInLibrary.length) {
      fetchAllCategoryiesInLibrary();
    }
  }, [fetchAllCategoryiesInLibrary, allCategoriesInLibrary]);

  return (
    <div className='layout-main-page'>
      <LeftBar />
      <Outlet />
    </div>
  );
};
