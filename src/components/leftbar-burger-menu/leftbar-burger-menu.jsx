import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { categories } from '../../constants/categoreis';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';

import './leftbar-burger-menu.scss';


export const LeftBarBurgerMenu= ({ isMenuOpen, setIsMenuOpen }) => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);

  const categories = useSelector((store) => store.books.categoriesData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const location = useLocation();
  const menuRef = useRef(null);


  useEffect(() => {
    if (location.pathname === '/books/terms' || location.pathname === '/books/contract') {
      setIsHeaderActive(false);
      setIsShowcaseOfBooksOpen(false)
    } else {
      setIsHeaderActive(true);
    }
  }, [location.pathname]);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false) //
  };

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

  useEffect(() => {
    if (booksLoadingError) {
      setIsShowcaseOfBooksOpen(false);
    }
  }, [booksLoadingError, isShowcaseOfBooksOpen]);

 
  return (
    <div
      data-test-id='burger-navigation'
      className={classNames('leftbar-burger-menu', { visible: isMenuOpen, closeBookLsts: isMenuOpen && !isShowcaseOfBooksOpen })}
      ref={menuRef}
      role='presentation'
    >
      <NavLink to='/books/all' data-test-id='burger-showcase'>
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
      </NavLink>
      <div className={isShowcaseOfBooksOpen ? 'categories-list' : 'categories-list closed'}>
        {categories.map((category) => (
          <NavLink
            data-test-id='burger-books'
            key={category.id}
            to={`/books/${category.link}`}
            className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
            onClick={handleClick}
          >
            <div key={category.id} className='category-item'>
              <div className='category-name'>
                {category.category}
                <span className='count'>{category.count}</span>
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
