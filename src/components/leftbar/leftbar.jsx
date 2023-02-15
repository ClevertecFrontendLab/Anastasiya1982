import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';

import './leftbar.scss';

export const LeftBar = () => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);
  const categories = useSelector((store) => store.books.categoriesData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/books/terms' || location.pathname === '/books/contract') {
      setIsHeaderActive(false);
      setIsShowcaseOfBooksOpen(false);
    } else {
      setIsHeaderActive(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (booksLoadingError) {
      setIsShowcaseOfBooksOpen(false);
    }
  }, [booksLoadingError, isShowcaseOfBooksOpen]);

  return (
    <div className='leftbar' role='presentation'>
      <NavLink to='/books/all' data-test-id='navigation-showcase'>
        <h5
          className={isHeaderActive ? 'header-of-leftbar' : 'header-of-leftbar simple'}
          onClick={() => setIsShowcaseOfBooksOpen(!isShowcaseOfBooksOpen)}
          role='presentation'
        >
          <span className='title'>Витрина книг</span>
          {isShowcaseOfBooksOpen ? (
            <IconUp className='icon-open-close-allbooksMenu' />
          ) : (
            <IconDown className='icon-open-close-allbooksMenu' />
          )}
        </h5>
      </NavLink>
      <div className={isShowcaseOfBooksOpen ? 'categories-list' : 'categories-list closed'}>
        <NavLink
          data-test-id='navigation-books'
          to='/books/all'
          className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
        >
          <div className='category-item'>
            <div className='category-name'> Все книги</div>
          </div>
        </NavLink>
        {categories &&
          categories.map((category) => (
            <NavLink
              data-test-id='navigation-books'
              key={category.id}
              to={`/books/${category.path}`}
              className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
            >
              <div key={category.id} className='category-item'>
                <div className='category-name'>
                  {category.name}
                  <span className='count'>{8}</span>
                </div>
              </div>
            </NavLink>
          ))}
      </div>

      <div className='terms-block'>
        <NavLink
          to='/books/terms'
          data-test-id='navigation-terms'
          className={({ isActive }) => (isActive ? 'active-link' : undefined)}
        >
          <h5>Правила пользования</h5>
        </NavLink>
      </div>
      <div className='contract-block'>
        <NavLink
          to='/books/contract'
          data-test-id='navigation-contract'
          className={({ isActive }) => (isActive ? 'active-link' : undefined)}
        >
          <h5>Договор оферты</h5>
        </NavLink>
      </div>
    </div>
  );
};
