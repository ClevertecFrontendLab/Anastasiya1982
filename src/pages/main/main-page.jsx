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
  const [sortedBooks, setSortedBooks] = useState(books);
  const sortOrder = useSelector((store) => store.books.sortOrderType);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const sortBooks = useCallback(() => {
    if (sortOrder === ASC_ORDER) {
      const sortArray = [...books].sort((a, b) => b.rating - a.rating);
      setSortedBooks(sortArray);
    } else {
      const sortArray = [...books].sort((a, b) => a.rating - b.rating);
      setSortedBooks(sortArray);
    }
  }, [books, sortOrder]);

  const handleModal = () => {
    setIsPopupOpen(!isPopupOpen);
  };  

  useEffect(() => {
    sortBooks();
  }, [sortOrder, sortBooks]);

  if (booksLoadingError) {
    return <ToastModal type='error' isPopupOpen={true} handleModal={handleModal} />;
  }

  return (
    <section className='main-page'>
      <div className='content'>
        <NavbarMainPage />
        <div className={initialView === VIEW_WINDOW ? 'cards-container-window' : 'cards-container-list'}>
          {sortedBooks && sortedBooks.map((card) => <Card card={card} key={card.id} currentView={initialView} />)}
        </div>
      </div>
    </section>
  );
};
