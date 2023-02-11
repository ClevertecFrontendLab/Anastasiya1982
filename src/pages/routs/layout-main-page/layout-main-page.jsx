import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBooksDataAsync, getCategoriesDataAsync } from '../../../store/books-reducer';

import { LeftBar } from '../../../components/leftbar/leftbar';

import './layout-main-page.scss';

export const LayoutMainPage = () => {
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooksDataAsync());
    dispatch(getCategoriesDataAsync());
  }, [dispatch]);
  
  return (
    <div className='layout-main-page'>
      <LeftBar />
      <Outlet />
    </div>
  );
};
