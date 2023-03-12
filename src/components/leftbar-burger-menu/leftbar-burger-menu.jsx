import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { logout } from '../../store/user-reducer';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';
import { getCategoriesDataAsync, setCurrentCategory, defaultAllCategories } from '../../store/books-reducer';

import './leftbar-burger-menu.scss';

export const LeftBarBurgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);

  const books = useSelector((store) => store.books.booksData);
  const categories = useSelector((store) => store.books.categoriesData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);
  const dispatch = useDispatch();
  const navigate=useNavigate();

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

  const handleClick = () => {
    setIsMenuOpen(false);
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

  const toggleClickOnCategory = useCallback(
    (category) => {
      dispatch(setCurrentCategory(category));
      setIsMenuOpen(false);
    },
    [dispatch, setIsMenuOpen]
  );

  const logoutUser = () => {
    dispatch(logout());
    handleClick();
    navigate('/auth')
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
      <div className='burger-showcase'>
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
      </div>
      <div className={isShowcaseOfBooksOpen ? 'categories-list' : 'categories-list closed'}>
        <NavLink
          data-test-id='burger-books'
          to='/books/all'
          key='all'
          className={({ isActive }) => (isActive ? 'all-category-item-link-active' : 'all-category-item-link')}
          onClick={() => toggleClickOnCategory(defaultAllCategories)}
        >
          <div className='category-item'>
            <div className='category-name'>Все книги</div>
          </div>
        </NavLink>
        {categories &&
          categories.map((category) => (
            <div className='category-item-wrapper' key={category?.id}>
              <NavLink
                data-test-id={`burger-${category.path}`}
                to={`/books/${category?.path}`}
                className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
                onClick={() => toggleClickOnCategory(category)}
              >
                <div className='category-item'>
                  <div className='category-name'>{category?.name}</div>
                </div>
              </NavLink>
              <span className='count' data-test-id={`burger-book-count-for-${category.path}`}>
                {category?.count}
              </span>
            </div>
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
        <button type='button' className='exit-button' onClick={logoutUser} data-test-id='exit-button'>
          Выход
        </button>
      </section>
    </div>
  );
};
