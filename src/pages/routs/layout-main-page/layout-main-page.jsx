import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksDataAsync } from '../../../store/books-reducer';

import { LeftBar } from '../../../components/leftbar/leftbar';

import './layout-main-page.scss';

export const LayoutMainPage = () => {
  const books = useSelector((store) => store.books);
  const dispatch = useDispatch();
  console.log('====================================');
  console.log(books);
  console.log('====================================');

  useEffect(() => {
    dispatch(getBooksDataAsync());
  }, [dispatch]);
  return (
    <div className='layout-main-page'>
      <LeftBar />
      <Outlet />
    </div>
  );
};
