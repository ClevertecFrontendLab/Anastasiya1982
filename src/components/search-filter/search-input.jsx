import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import DeleteIcon from '../../assets/delete-search-icon.svg';

import SearchIcon from '../../assets/search-icon.svg';

import './search-input.scss';

export const SearchInput = ({ setIsSearchInputMobileOpen, isSearchInputMobileOpen }) => {
  const [isClearButtonIsVisible, setIsClearButtonVisible] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const inputRef = useRef(null);

  const clearInput = () => {
    setIsSearchInputMobileOpen(false);
    setSearchValue('');
    setIsClearButtonVisible(false);
  };

  useEffect(() => {
    if (isSearchInputMobileOpen) {
      inputRef.current.focus();
    }
  }, [isSearchInputMobileOpen]);

  return (
    <div className={classNames('search-input', { open: isSearchInputMobileOpen })} data-test-id='input-search'>
      <input
        ref={inputRef}
        className='search-block-input'
        type='text'
        id='search'
        placeholder='Поиск книги или автора…'
        onFocus={() => {
          setIsClearButtonVisible(true);
        }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <img alt='loop' src={SearchIcon} className='search-icon' role='presentation' />
      <img
        data-test-id='button-search-close'
        alt='delete-icon'
        src={DeleteIcon}
        role='presentation'
        className={!isClearButtonIsVisible ? 'clear-icon' : 'clear-icon visible'}
        onClick={clearInput}
      />
    </div>
  );
};
