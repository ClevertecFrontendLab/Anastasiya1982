import { useContext } from 'react';

import { ViewCardsContext} from '../../context/view-cards-context';
import { NavbarMainPage } from '../../components/navbar';
import { Card } from '../../components/card/card';
import cards from '../../books.json';

import './main-page.scss';
import { VIEW_WINDOW } from '../../components/navbar/navbar-main-page';

export const MainPage = () => {
  const {initialView} = useContext(ViewCardsContext);
  
  return (
    <section className='main-page'>
      <div className='content'>
        <NavbarMainPage />
        <div className={initialView === VIEW_WINDOW ? 'cards-container-window' : 'cards-container-list'}>
          {cards.cards.map((card) => (
            <Card card={card} key={card.id} currentView={initialView} />
          ))}
        </div>
      </div>
    </section>
  );
};
