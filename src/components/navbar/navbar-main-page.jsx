import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { ViewCardsContext } from '../../context/view-cards-context';
import { ReactComponent as SortDescIcon } from '../../assets/filter-up-button.svg';
import { ReactComponent as SortAscIcon } from '../../assets/filter-down-button.svg';
import { ReactComponent as ViewListIcon } from '../../assets/view-list-books.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu-books-page.svg';
import { setSortOrderType } from '../../store/books-reducer';

import SearchIcon from '../../assets/search-icon.svg';
import { SearchInput } from '../search-filter/search-input';

import './navbar-main-page.scss';

export const VIEW_WINDOW = 'view-window';
export const VIEW_LIST = 'view-list';
export const ASC_ORDER='asc';
export const DESC_ORDER='desc';

export function NavbarMainPage() {
  const { initialView, changeView } = useContext(ViewCardsContext);
  const [activeView, setActiveView] = useState(initialView);
  const [isSearchInputMobileOpen, setIsSearchInputMobileOpen] = useState(false);
  
 const sortOrder = useSelector((store) => store.books.sortOrderType);
 const dispatch=useDispatch();


  const changeViewBooksWindow = () => {
    setActiveView(VIEW_WINDOW);
    changeView(VIEW_WINDOW);
  };

  const changeViewBooksList = () => {
    setActiveView(VIEW_LIST);
    changeView(VIEW_LIST);
  };

  const toggleOpenSearchInput = (p) => {
    setIsSearchInputMobileOpen(p);
  };

  const setOrderRatindType=()=>{
    if(sortOrder=== ASC_ORDER){
        dispatch(setSortOrderType(DESC_ORDER));
    }
    else if(sortOrder === DESC_ORDER){
        dispatch(setSortOrderType(ASC_ORDER));
    }
  }

  return (
    <div className='navbar'>
      <div className='content'>
        <div className='search-filter-block'>
          <SearchInput
            setIsSearchInputMobileOpen={toggleOpenSearchInput}
            isSearchInputMobileOpen={isSearchInputMobileOpen}
          />
          <button
            className={classNames('search-input-mobile-button', { close: isSearchInputMobileOpen })}
            type='button'
            data-test-id='button-search-open'
            onClick={() => {
              setIsSearchInputMobileOpen(true);
            }}
          >
            <img alt='loop' src={SearchIcon} className='search-icon' role='presentation' />
          </button>
          <button
            type='button'
            className={classNames('sorting-button', { hide: isSearchInputMobileOpen })}
            data-test-id='sort-rating-button'
            onClick={setOrderRatindType}
          >
            {sortOrder === 'asc' ? (
              <SortAscIcon className='sorting-asc-icon' />
            ) : (
              <SortDescIcon className='sorting-asc-icon' />
            )}
            <span>По рейтингу</span>
          </button>
        </div>
        <div className={classNames('view-and-menu-block', { hide: isSearchInputMobileOpen })}>
          <button
            type='button'
            data-test-id='button-menu-view-window'
            className={activeView === VIEW_WINDOW ? 'change-view-books active' : 'change-view-books'}
            onClick={changeViewBooksWindow}
          >
            <ViewListIcon className={VIEW_WINDOW} />
          </button>
          <button
            type='button'
            data-test-id='button-menu-view-list'
            className={activeView === VIEW_LIST ? 'change-view-books active' : 'change-view-books'}
            onClick={changeViewBooksList}
          >
            <MenuIcon className={VIEW_LIST} />
          </button>
        </div>
      </div>
    </div>
  );
}
