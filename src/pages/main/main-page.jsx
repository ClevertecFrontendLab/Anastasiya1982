import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewCardsContext } from '../../context/view-cards-context';
import { NavbarMainPage } from '../../components/navbar';
import { Card } from '../../components/card/card';
import { ToastModal } from '../../components/toast-modal/toast-modal';

import { VIEW_WINDOW } from '../../components/navbar/navbar-main-page';

import './main-page.scss';

export const MainPage = () => {
  const { initialView } = useContext(ViewCardsContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const books = useSelector((store) => store.books.booksData);
  const booksLoadingError = useSelector((store) => store.books.booksDataError);

  const handleModal = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (booksLoadingError) {
    return <ToastModal type='error' isPopupOpen={true} handleModal={handleModal} />;
  }

  return (
    <section className='main-page'>
      <div className='content'>
        <NavbarMainPage />
        <div className={initialView === VIEW_WINDOW ? 'cards-container-window' : 'cards-container-list'}>
          {books && books.map((card) => <Card card={card} key={card.id} currentView={initialView} />)}
        </div>
      </div>
    </section>
  );
};
