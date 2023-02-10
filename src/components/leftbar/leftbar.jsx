import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { categories } from '../../constants/categoreis';
import { ReactComponent as IconDown } from '../../assets/Icon_Chevron.svg';
import { ReactComponent as IconUp } from '../../assets/icon-up-leftbar.svg';

import './leftbar.scss';

export const LeftBar = () => {
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  const [isShowcaseOfBooksOpen, setIsShowcaseOfBooksOpen] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/books/terms' || location.pathname === '/books/contract') {
      setIsHeaderActive(false);
      setIsShowcaseOfBooksOpen(false)
    } else {
      setIsHeaderActive(true);
    }
  }, [location.pathname]);

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
            <IconDown            
              className='icon-open-close-allbooksMenu'
            />
          )}
        </h5>
      </NavLink>
      <div className={isShowcaseOfBooksOpen ? 'categories-list' : 'categories-list closed'}>
        {categories.map((category) => (
          <NavLink
            data-test-id='navigation-books'
            key={category.id}
            to={`/books/${category.link}`}
            className={({ isActive }) => (isActive ? 'category-item-link-active' : 'category-item-link')}
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
