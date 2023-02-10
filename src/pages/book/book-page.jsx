import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Raiting } from '../../components/raiting/raiting';
import { usersRewiews } from '../../users-rewiews';
import { DetailedInfoBlock } from '../../components/detailed-information/detailed-info';

import userLogo from '../../assets/user-logo-default.png';
import { BookPreview } from '../../components/book-preview/book-preview';
import { ReactComponent as SwitchIconUp } from '../../assets/switch-up-icon.svg';
import { ReactComponent as SwitchIconDown } from '../../assets/switch-down-icon.svg';

import './book-page.scss';

export const BookPage = () => {
  const [isCommentsBlockOpen, setIsCommentsBlockOpen] = useState(true);
  const location = useLocation();

  const { title, category, image } = location.state;

  return (
    <div className='book-page'>
      <header className='book-page-header'>
        <div className='header-container'>
          <div className='book-category-name'>
            {category}
            <span>&#8260;</span> {title}
          </div>
        </div>
      </header>
      <main className='main'>
        <div className='container'>
          <section className='book-status-container'>
            <div className='img-container'>
              <BookPreview imageRoute={image} />
            </div>
            <div className='books-description'>
              <h3 className='books-title'>
                Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих.
              </h3>
              <div className='books-author'>Адитья Бхаргава, 2019</div>
              <div className='booked-button-section'>
                <button type='button'>Забронировать</button>
              </div>
            </div>
            <div className='about-book'>
              <div className='title'>О книге</div>
              <p>
                Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
                решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
                изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
                время?
              </p>
              <p>
                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                алгоритмы — это веселое и увлекательное занятие.
              </p>
            </div>
          </section>

          <section className='rating-section'>
            <div className='title'>Rating</div>
            <div className='rating-container'>
              <Raiting rating={4} />
              <span className='rating-count'>4.3</span>
            </div>
          </section>
          <section className='detailed-information'>
            <div className='title'>Подробная информация</div>

            <DetailedInfoBlock />
          </section>
          <section className='rewiews'>
            <div className='title'>
              <span>Отзывы</span> <span className='rewiews-count'>2</span>
              <span
                data-test-id='button-hide-reviews'
                className='switch-icon'
                onClick={() => setIsCommentsBlockOpen(!isCommentsBlockOpen)}
                role='presentation'
              >
                {isCommentsBlockOpen ? <SwitchIconDown /> : <SwitchIconUp />}
              </span>
            </div>
            <div className={classNames('rewiews-list', { closed: !isCommentsBlockOpen })}>
              {usersRewiews.map((comment) => (
                <div className='comment-content' key={comment.id}>
                  <div className='user-logo'>
                    <img src={userLogo} alt='user-logo' />
                    <div className='user-info'>
                      <span>{comment.userName}</span>
                      <span>{comment.date}</span>
                    </div>
                  </div>
                  <div className='user-rating'>
                    <Raiting />
                  </div>
                  <div className='comment-text'>{comment.comments !== null ? comment.comments[0].text : ''}</div>
                </div>
              ))}
            </div>
          </section>
          <section className='estimation-block'>
            <button data-test-id='button-rating' type='button' className='estimate-button'>
              Оценить
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};
