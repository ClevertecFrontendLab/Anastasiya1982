import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';
import { setCurrentCategory } from '../../store/books-reducer';

import './leftbar.scss';

export const LeftBar = () => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);
  const categories = useSelector((store) => store.books.categoriesData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);
  const books = useSelector((store) => store.books.booksData);

  const location = useLocation();
  const dispatch = useDispatch();

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

  const countNumberOfBooksWithCategory = (name) => {
    let i;
    let count = 0;
    for (i = 0; i < books.length; i++) {
      count += books[i].categories[0] === name ? 1 : 0;
    }
    return count;
  };

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
          onClick={() => {
                dispatch(setCurrentCategory('all'));
              }}
        >
          <div className='category-item'>
            <div className='category-name'> Все книги</div>
          </div>
        </NavLink>
        {categories &&
          categories.map((category) => (
            <NavLink         
            data-test-id={`navigation-${category}`}
              key={category.id}
              to={`/books/${category.path}`}
              className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
              onClick={() => {
                dispatch(setCurrentCategory(category.name));
              }}
            >
              <div key={category.id} className='category-item'>
                <div className='category-name'>
                  {category.name}
                  <span className='count'
                  data-test-id={`navigation-book-count-for-${category}`}>{countNumberOfBooksWithCategory(category.name)}</span>
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
