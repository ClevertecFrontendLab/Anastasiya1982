import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';
import { Header } from '../../../components/header';
import { Footer } from '../../../components/footer';
import { Loader } from '../../../components/loader/loader';
// import { getBooksDataAsync, getCategoriesDataAsync } from '../../../store/books-reducer';

import './layout.scss';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();

  const isDataLoading = useSelector((store) => store.books.setIsDataLoading);

//   useEffect(() => {
//     // dispatch(getCategoriesDataAsync());
//     dispatch(getBooksDataAsync());   
//   }, [dispatch]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <div className='layout'>
      <div className='container'>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className='main-page-content'>
          <Outlet context={[isMenuOpen, setIsMenuOpen]} />
        </div>
        <Footer />
      </div>
      {isDataLoading && <Loader />}
    </div>
  );
};
