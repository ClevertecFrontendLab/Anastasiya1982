import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getBookDataAsync } from '../../store/book-data-reducer';
import { Loader } from '../../components/loader/loader';
import { Raiting } from '../../components/raiting/raiting';
import { usersRewiews } from '../../users-rewiews';
import { DetailedInfoBlock } from '../../components/detailed-information/detailed-info';
import { ToastModal } from '../../components/toast-modal/toast-modal';
import userLogo from '../../assets/user-logo-default.png';
import { BookPreview } from '../../components/book-preview/book-preview';
import { ReactComponent as SwitchIconUp } from '../../assets/switch-up-icon.svg';
import { ReactComponent as SwitchIconDown } from '../../assets/switch-down-icon.svg';

import './book-page.scss';

export const BookPage = () => {
  const [isCommentsBlockOpen, setIsCommentsBlockOpen] = useState(true);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const { category, booksId } = useParams();

  const book = useSelector((store) => store.bookData.bookData);
  const isBookDataLoading = useSelector((store) => store.bookData.isBookDataLoading);
  const isBookDataLoadingError = useSelector((store) => store.bookData.bookDataError);

  useEffect(() => {
    dispatch(getBookDataAsync(booksId));
  }, [dispatch, booksId]);
 

  useEffect(() => {
    if (isBookDataLoadingError) {
      setIsErrorPopupOpen(true);
    } else {
      setIsErrorPopupOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookDataLoadingError]);

  const handleModal = () => {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  };

  return (
    <div className='book-page'>
      {isBookDataLoading && <Loader />}
      <header className='book-page-header'>
        <div className='header-container'>
          <div className='book-category-name'>
            {category}
            <span>&#8260;</span> {book?.title}
          </div>
        </div>
      </header>
      {isErrorPopupOpen  && (
        <ToastModal type='error' handleModal={handleModal} data-test-id='error' isPopupOpen={isErrorPopupOpen} />
      ) }
        <main className='main'>
          <div className='container'>
            <section className='book-status-container'>
              <div className='img-container'>
                <BookPreview imageRoute={book?.images} />
              </div>
              <div className='books-description'>
                <h3 className='books-title'>{book?.title}</h3>
                <div className='books-author'>{book?.authors[0]}</div>
                <div className='booked-button-section'>
                  <button type='button'>Забронировать</button>
                </div>
              </div>
              <div className='about-book'>
                <div className='title'>О книге</div>
                <p>{book?.description}</p>
              </div>
            </section>
            <section className='rating-section'>
              <div className='title'>Rating</div>
              <div className='rating-container'>
                <Raiting rating={book?.rating} />
                <span className='rating-count'>{book?.rating}</span>
              </div>
            </section>
            <section className='detailed-information'>
              <div className='title'>Подробная информация</div>
              <DetailedInfoBlock book={book} />
            </section>
            <section className='rewiews'>
              <div className='title'>
                <span>Отзывы</span> <span className='rewiews-count'>{book?.comments ? book.comments.length : ''}</span>
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
                {book?.comments &&
                  book.comments.map((comment) => (
                    <div className='comment-content' key={comment.id}>
                      <div className='user-logo'>
                        <img src={userLogo} alt='user-logo' />
                        <div className='user-info'>
                          <span>
                            {comment.user.firstName}
                            {comment.user.lastName}
                          </span>
                          <span>{comment.createdAt}</span>
                        </div>
                      </div>
                      <div className='user-rating'>
                        <Raiting />
                      </div>
                      {comment && <div className='comment-text'>{comment.text}</div>}
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
