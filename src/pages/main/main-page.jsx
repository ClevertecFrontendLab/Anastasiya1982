import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewCardsContext } from '../../context/view-cards-context';
import { NavbarMainPage } from '../../components/navbar';
import { Card } from '../../components/card/card';
import { ToastModal } from '../../components/toast-modal/toast-modal';

import { ASC_ORDER, VIEW_WINDOW } from '../../components/navbar/navbar-main-page';

import './main-page.scss';

export const MainPage = () => {
  const { initialView } = useContext(ViewCardsContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const books = useSelector((store) => store.books.booksData);
  const [filteredByCategoryBooks, setFilteredByCategoryBooks] = useState(books);
  const [sortedBooks, setSortedBooks] = useState(filteredByCategoryBooks);
  const [isFilteredBooksArrayEmpty, setIsFileredBooksArrayEmpty] = useState(false);
  const sortOrder = useSelector((store) => store.books.sortOrderType);
  const currentCategory = useSelector((store) => store.books.currentCategory);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const filteredBooksByCategory = useCallback(() => {
    if (currentCategory !== 'all') {
      const newBooksArray = books.filter((book) =>
        book.categories[0].toLowerCase().includes(currentCategory.toLowerCase())
      );
      setFilteredByCategoryBooks(newBooksArray);
    } else {
      setFilteredByCategoryBooks(books);
    }
  }, [currentCategory, books]);

  const sortBooks = useCallback(() => {
    if (sortOrder === ASC_ORDER) {
      const sortArray = [...filteredByCategoryBooks].sort((a, b) => b.rating - a.rating);
      setSortedBooks(sortArray);
    } else {
      const sortArray = [...filteredByCategoryBooks].sort((a, b) => a.rating - b.rating);
      setSortedBooks(sortArray);
    }
  }, [sortOrder, filteredByCategoryBooks]);

  const handleModal = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    sortBooks();
  }, [sortOrder, sortBooks]);

  useEffect(() => {
    filteredBooksByCategory();
  }, [currentCategory, filteredBooksByCategory]);

  if (booksLoadingError) {
    return <ToastModal type='error' isPopupOpen={true} handleModal={handleModal} />;
  }

  return (
    <section className='main-page'>
      <div className='content'>
        <NavbarMainPage />
        {!filteredByCategoryBooks.length ? (
          <div className='empty-category-container' data-test-id='empty-category'>
            <h3>В этой категории книг ещё нет</h3>
          </div>
        ) : (
          <div className={initialView === VIEW_WINDOW ? 'cards-container-window' : 'cards-container-list'}>
            {sortedBooks && sortedBooks.map((card) => <Card card={card} key={card.id} currentView={initialView} />)}
          </div>
        )}
      </div>
    </section>
  );
};
