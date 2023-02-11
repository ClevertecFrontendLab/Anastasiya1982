import { useNavigate } from 'react-router-dom';

import { Raiting } from '../raiting/raiting';
import cardImg from '../../assets/card-image.png';
import defaultImg from '../../assets/default-card-image.png';

import './card.scss';

const BASE_URL = 'https://strapi.cleverland.by';

export const Card = ({ card, currentView }) => {
  const navigate = useNavigate();

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      navigate(`/books/categoty/:${card.id}`);
    }
  };

  const buttonStatus = card.booking === null ? 'Забронировать' : `Занята до ${22.04}`;

  //    const buttonStatus =
  //      !card.booking && card.bookedTill !== 'null'
  //        ? `Занята до ${card.booking.date}`
  //        : card.isBooked && card.bookedTill === 'null'
  //        ? 'Забронировано'
  //        : 'Забронировать';
 
const cardImageSrc=card.image ? `${BASE_URL}${card.image.url}` : defaultImg;

  return (
    <div
      className={`card-content-${currentView}`}
      data-test-id='card'
      onClick={() =>
        navigate(`/books/${card.categories[0]}/${card.id}`, {
          state: {
            id: card.id,
          },
        })
      }
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex='0'
    >
      <div className='img-container'>
        <img src={cardImageSrc} alt='card-img' />
      </div>
      <div className='card-desciption'>
        <div className='raiting-block'>
          {card.rating === 0 ? (
            <div className='no-rating-content'>Еще нет оценок</div>
          ) : (
            <Raiting rating={card.rating} />
          )}
        </div>

        <div className='card-title'>
          <h4>{card.title}</h4>
        </div>
        <div className='card-author'>{card.authors && card.authors[0]}</div>
        <div className='submit-block'>
          <button type='button' className={card.booking === null ? 'primary' : 'secondary'}>
            {buttonStatus}
          </button>
        </div>
      </div>
    </div>
  );
};
