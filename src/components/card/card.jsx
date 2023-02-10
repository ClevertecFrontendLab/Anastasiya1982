import { useNavigate } from 'react-router-dom';

import { Raiting } from '../raiting/raiting';
import cardImg from '../../assets/card-image.png';
import defaultImg from '../../assets/default-card-image.png';

import './card.scss';

export const Card = ({ card, currentView }) => {
  const navigate = useNavigate();

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      navigate(`/books/categoty/:${card.id}`);
    }
  };

  const buttonStatus =
    !card.isBooked && card.bookedTill !== 'null'
      ? `Занята до ${card.bookedTill}`
      : card.isBooked && card.bookedTill === 'null'
      ? 'Забронировано'
      : 'Забронировать';

  return (
    <div
      className={`card-content-${currentView}`}
      data-test-id='card'
      onClick={() =>
        navigate(`/books/categoty/:${card.id}`, {
          state: {
            image: card.image,
            title: card.title,
            category: 'Бизнес-книги',
          },
        })
      }
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex='0'
    >
      <div className='img-container' >
        <img src={card.image === null ? defaultImg : cardImg} alt='card-img' />
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
        <div className='card-author'>{card.author}</div>
        <div className='submit-block'>
          <button type='button' className={card.bookedTill === 'null' && !card.isBooked ? 'primary' : 'secondary'}>
            {buttonStatus}
          </button>
        </div>
      </div>
    </div>
  );
};
