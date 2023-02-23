import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ViewCardsContext } from '../../context/view-cards-context';
import { NavbarMainPage } from '../../components/navbar';
import { Card } from '../../components/card/card';
import { ToastModal } from '../../components/toast-modal/toast-modal';
import { getBooksDataAsync, setCountToAllCategories } from '../../store/books-reducer';

import { ASC_ORDER, VIEW_WINDOW } from '../../components/navbar/navbar-main-page';

import './main-page.scss';

const filteredBooksByCategory = (books, currentCategory) => {
  if (currentCategory.path !== 'all') {
    const newBooksArray = books.filter((book) => book?.categories.includes(currentCategory?.name));
    return newBooksArray;
  }
  return books;
};

const sortBooks = (sortOrder, books) => {
  if (sortOrder === ASC_ORDER) {
    return [...books].sort((a, b) => b.rating - a.rating);
  }
  return [...books].sort((a, b) => a.rating - b.rating);
};

const filterBooksByTitle = (books, title) => {
  if (title) {
    return books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
  }
  return books;
};

export const MainPage = () => {
  const { initialView } = useContext(ViewCardsContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const books = useSelector((store) => store.books.booksData);
  const categories = useSelector((store) => store.books.categoriesData);
  const [searchTitleValue, setSearchTitleValue] = useState('');
  const [searchedBooksArray, setSearchedBooksArray] = useState([]);
  const sortOrder = useSelector((store) => store.books.sortOrderType);
  const currentCategory = useSelector((store) => store.books.currentCategory);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const location = useLocation();
  const dispatch = useDispatch();

  const handleModal = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    if (location?.state) {
      dispatch(getBooksDataAsync());
    }
  }, [location, dispatch]);

  useEffect(() => {
    let bookTemp = books;
    if (currentCategory) {
      bookTemp = filteredBooksByCategory(books, currentCategory);
    }
    bookTemp = sortBooks(sortOrder, bookTemp);
    bookTemp = filterBooksByTitle(bookTemp, searchTitleValue);
    setSearchedBooksArray(bookTemp);
  }, [books, currentCategory, sortOrder, searchTitleValue]);

  if (booksLoadingError) {
    return <ToastModal type='error' isPopupOpen={true} handleModal={handleModal} />;
  }

  return (
    <section className='main-page'>
      <div className='content'>
        <NavbarMainPage searchTitleValue={searchTitleValue} setSearchTitleValue={setSearchTitleValue} />
        {currentCategory?.count === 0 ? (
          <div className='empty-category-container' data-test-id='empty-category'>
            <h3>В этой категории книг ещё нет</h3>
          </div>
        ) : (
          <div className={initialView === VIEW_WINDOW ? 'cards-container-window' : 'cards-container-list'}>
            {!searchedBooksArray.length && searchTitleValue ? (
              <div className='empty-category-container'>
                <h3 data-test-id='search-result-not-found'>По запросу ничего не найдено</h3>
              </div>
            ) : (
              searchedBooksArray.map((card) => (
                <Card
                  card={card}
                  key={card.id}
                  currentView={initialView}
                  currentCategory={currentCategory}
                  searchTitleValue={searchTitleValue}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
