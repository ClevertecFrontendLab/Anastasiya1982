import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Raiting } from '../raiting/raiting';
import { Highlight } from '../hightligth-element/hightligth-element';
import loaderImg from '../../assets/loader-image.gif';
import defaultImg from '../../assets/default-card-image.png';

import './card.scss';

const BASE_URL = 'https://strapi.cleverland.by';

export const Card = ({ card, currentView, currentCategory, searchTitleValue }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const ligthElementWhileFilter = useCallback(
    (str) => <Highlight filter={searchTitleValue} str={str} />,
    [searchTitleValue]
  );

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      navigate(`/books/${currentCategory.path}/${card.id}`);
    }
  };

  const buttonStatus = !card.booking ? 'Забронировать' : `Занята до ${22.04}`;

  const cardImageSrc = card.image ? `${BASE_URL}${card.image.url}` : defaultImg;

  return (
    <div
      className={`card-content-${currentView}`}
      data-test-id='card'
      onClick={() =>
        navigate(`/books/${currentCategory.path}/${card.id}`, {
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
        <img
          src={cardImageSrc}
          alt='card-img'
          onLoad={(e) => {
            setIsLoading(false);
          }}
          className={classNames('card-image', { close: isLoading })}
        />
        <img src={loaderImg} alt='loader' className={classNames('loader', { hidden: !isLoading })} />
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
          <h4>{ligthElementWhileFilter(card.title)}</h4>
        </div>
        <div className='card-author'>{card.authors && card.authors[0]}</div>
        <div className='submit-block'>
          <button type='button' className={!card.booking ? 'primary' : 'secondary'}>
            {buttonStatus}
          </button>
        </div>
      </div>
    </div>
  );
};
