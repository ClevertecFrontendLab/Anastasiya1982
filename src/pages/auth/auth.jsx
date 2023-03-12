import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Loader } from '../../components/loader/loader';
import { setAuthInfo } from '../../store/user-reducer';
import { LoginForm } from '../../components/login-form/login-form';
import { ReactComponent as ArrorIconSvg } from '../../assets/arror-icon.svg';

import './auth.scss';

export const AuthPage = () => {
  const navigate = useNavigate();

  const errorLoginRequest = useSelector((store) => store.userData.authInfo);

  const isAuth = localStorage.getItem('isAuth');

  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className='auth-page'>
      {isUserDataLoading && <Loader />}
      <div className='auth-page-wrapper'>
        <h3 className='auth-page-header'>Cleverland</h3>
        <div className='form-container' data-test-id='auth'>
          {errorLoginRequest?.info && errorLoginRequest?.status !== 400 ? (
            <div className='error-login-message-container' data-test-id='status-block'>
              <h3 className='error-title'>Вход не выполнен</h3>
              <p className='message-block'>Что-то пошло не так. Попробуйте ещё раз</p>
              <button
                type='button'
                className='submit-form-button'
                onClick={() => dispatch(setAuthInfo({ status: null, info: null }))}
              >
                повторить
              </button>
            </div>
          ) : (
            <div className='form-container-wrapper'>
              <h3 className='form-container-title'>Вход в личный кабинет</h3>
              <LoginForm />
              <div className='enter-block'>
                <span className='enter-block-title'>Нет учетной записи?</span>
                <Link to='/registration' className='enter-block-button'>
                  <span className='enter-button-value'>Регистрация</span> <ArrorIconSvg />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
