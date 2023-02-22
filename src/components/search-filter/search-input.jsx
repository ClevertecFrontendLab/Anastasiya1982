import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import DeleteIcon from '../../assets/delete-search-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';

import './search-input.scss';

export const SearchInput = ({
  setIsSearchInputMobileOpen,
  isSearchInputMobileOpen,
  searchTitleValue,
  setSearchTitleValue,
}) => {
  const [isClearButtonIsVisible, setIsClearButtonVisible] = useState(false);

  const inputRef = useRef(null);

  const clearInput = () => {
    setIsSearchInputMobileOpen(false);
    setIsClearButtonVisible(false);
  };

  useEffect(() => {
    if (isSearchInputMobileOpen) {
      inputRef.current.focus();
      setIsClearButtonVisible(true);
    }
  }, [isSearchInputMobileOpen]);

  return (
    <div className={classNames('search-input', { open: isSearchInputMobileOpen })}>
      <input
        data-test-id='input-search'
        ref={inputRef}
        className='search-block-input'
        type='text'
        id='search'
        placeholder='Поиск книги или автора…'
        value={searchTitleValue}
        onChange={(e) => {
          setSearchTitleValue(e.target.value);
        }}
      />

      <SearchIcon className={classNames('search-icon', { hide: isSearchInputMobileOpen })} role='presentation' />
      <img
        data-test-id='button-search-close'
        alt='delete-icon'
        src={DeleteIcon}
        role='presentation'
        className={isClearButtonIsVisible ? 'clear-icon visible' : 'clear-icon'}
        onClick={clearInput}
      />
    </div>
  );
};
