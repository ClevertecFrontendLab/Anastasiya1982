import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';
import { getCategoriesDataAsync, setCurrentCategory } from '../../store/books-reducer';

import './leftbar-burger-menu.scss';

export const LeftBarBurgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);

  const books = useSelector((store) => store.books.booksData);
  const categories = useSelector((store) => store.books.categoriesData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);
  const dispatch = useDispatch();

  const location = useLocation();
  const menuRef = useRef(null);

  const fetchCategoruesList = useCallback(() => {
    dispatch(getCategoriesDataAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!categories.length && isMenuOpen) {
      fetchCategoruesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname === '/books/terms' || location.pathname === '/books/contract') {
      setIsHeaderActive(false);
      setIsShowcaseOfBooksOpen(false);
    } else {
      setIsHeaderActive(true);
    }
  }, [location.pathname]);

  const handleClick = (value) => {   
    dispatch(setCurrentCategory(value));
    setIsMenuOpen(false); //
  };

  useEffect(() => {
    if (booksLoadingError) {
      setIsShowcaseOfBooksOpen(false);
    }
  }, [booksLoadingError, isShowcaseOfBooksOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const countNumberOfBooksWithCategory = (name) => {
    let i;
    let count = 0;
    for (i = 0; i < books.length; i++) {
      count += books[i].categories[0] === name ? 1 : 0;
    }
    return count;
  };

  return (
    <div
      data-test-id='burger-navigation'
      className={classNames('leftbar-burger-menu', {
        visible: isMenuOpen,
        closeBookLsts: isMenuOpen && !isShowcaseOfBooksOpen,
      })}
      ref={menuRef}
      role='presentation'
    >
      <div className='burger-showcase' data-test-id='burger-showcase'>
        <h5 className={isHeaderActive ? 'header-of-leftbar' : 'header-of-leftbar simple'}>
          <span className='title'>Витрина книг</span>
          {isShowcaseOfBooksOpen ? (
            <IconUp
              onClick={() => setIsShowcaseOfBooksOpen(!isShowcaseOfBooksOpen)}
              className='icon-open-close-allbooksMenu'
            />
          ) : (
            <IconDown
              onClick={() => setIsShowcaseOfBooksOpen(!isShowcaseOfBooksOpen)}
              className='icon-open-close-allbooksMenu'
            />
          )}
        </h5>
      </div>
      <div className={isShowcaseOfBooksOpen ? 'categories-list' : 'categories-list closed'}>
        <NavLink
          data-test-id='burger-books'
          to='/books/all'
          className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
          onClick={() => {
            handleClick('all');
          }}
        >
          <div className='category-item'>
            <div className='category-name'>Все книги</div>
          </div>
        </NavLink>
        {categories &&
          categories.map((category) => (
            <NavLink
              data-test-id={`burger-${category}`}
              key={category?.id}
              to={`/books/${category?.path}`}
              className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
              onClick={() => {
                handleClick(category.name);
              }}
            >
              <div key={category?.id} className='category-item'>
                <div className='category-name'>
                  {category?.name}
                  <span className='count'
                   data-test-id={`burger-book-count-for-${category}`}
                  >{countNumberOfBooksWithCategory(category.name)}</span>
                </div>
              </div>
            </NavLink>
          ))}
      </div>

      <div className='terms-block'>
        <NavLink
          data-test-id='burger-terms'
          to='/books/terms'
          className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          onClick={handleClick}
        >
          <h5>Правила пользования</h5>
        </NavLink>
      </div>
      <div className='contract-block'>
        <NavLink
          data-test-id='burger-contract'
          to='/books/contract'
          className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          onClick={handleClick}
        >
          <h5>Договор оферты</h5>
        </NavLink>
      </div>
      <section className='profile-section-left-menu'>
        <NavLink
          to='/profile'
          className={({ isActive }) => (isActive ? ' profile-block active-link' : 'profile-block')}
          onClick={handleClick}
        >
          <h5>Профиль</h5>
        </NavLink>

        <NavLink
          to='/books/exit'
          className={({ isActive }) => (isActive ? 'exit-block active-link' : 'exit-block')}
          onClick={handleClick}
        >
          <h5>Выход</h5>
        </NavLink>
      </section>
    </div>
  );
};
