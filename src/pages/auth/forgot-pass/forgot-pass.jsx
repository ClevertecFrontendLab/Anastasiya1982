import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as ArrorBackIconSvg } from '../../../assets/arrow-back-icon.svg';
import { ReactComponent as ArrorIconSvg } from '../../../assets/arror-icon.svg';
import { ForgotPassForm } from './forgot-pass-form/forgot-pass-form';
import { ResetPasswordForm } from './reset-password-form/reset-password-form';
import { Loader } from '../../../components/loader/loader';
import { setResetPassError } from '../../../store/user-reducer';

import './forgot-pass.scss';

export const ForgotPassPage = () => {
  const [params, setParams] = useState(null);
  const isAuth = localStorage.getItem('isAuth');
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);
  const isRestoreEmailSend = useSelector((store) => store.userData.isRestoreEmailSend);
  const resetPassSuccess = useSelector((store) => store.userData.resetPassSuccess);
  const resetPassError = useSelector((store) => store.userData.resetPassError);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log('====================================');
  console.log('email.send',isRestoreEmailSend);
  console.log('====================================');

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    const query = new URLSearchParams(location?.search);
    const code = query.get('code');
    if (!code) return;
    setParams(code);
  }, [location]);

  return (
    <div className='forgot-pass-page'>
      {isUserDataLoading && <Loader />}
      <div className='forgot-pass-page-wrapper'>
        <h3 className='forgot-pass-page-header'>Cleverland</h3>
        <div className='form-container'>
          {params && (
            <div className='form-container-wrapper' data-test-id='auth'>
              {resetPassSuccess && (
                <div className='modal-message-container' data-test-id='status-block'>
                  <h3 className='title'>Новые данные сохранены</h3>
                  <p className='message-message'>
                    Зайдите в личный кабинет,
                    <br /> используя свои логин и новый пароль
                  </p>
                  <button type='button' className='submit-form-button' onClick={() => navigate('/auth')}>
                    вход
                  </button>
                </div>
              )}
              {resetPassError?.status && (
                <div className='modal-message-container' data-test-id='status-block'>
                  <h3 className='title'>Данные не сохранились</h3>
                  <p className='message-block'>Что-то пошло не так. Попробуйте ещё раз</p>
                  <button
                    type='button'
                    className='submit-form-button'
                    onClick={() => dispatch(setResetPassError(null))}
                  >
                    вход
                  </button>
                </div>
              )}
              {!resetPassSuccess && !resetPassError && (
                <div className='form-content' data-test-id='auth'>
                  <h3 className='form-container-title'>Восстановление пароля</h3>
                  <ResetPasswordForm code={params} />
                </div>
              )}
            </div>
          )}
          {!params && (
            <div className='form-container-wrapper'>
              {isRestoreEmailSend ? (
                 <div className='modal-message-container' data-test-id='status-block'>
                  <h3 className='title'>Письмо выслано</h3>
                  <p className='message-block'>
                    Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
                  </p>
                </div>):(
                <div className='form-container-wrapper' data-test-id='auth'>
                  <div className='form-container-header' role='presentation' onClick={() => navigate('/auth')}>
                    <ArrorBackIconSvg className='arrow-icon' /> <span>вход в личный кабинет</span>
                  </div>
                  <div className='form-content'>
                    <h3 className='form-container-title'>Восстановление пароля</h3>
                    <ForgotPassForm />
                    <div className='enter-block'>
                      <span className='enter-block-title'>Нет учетной записи?</span>
                      <Link to='/registration' className='enter-block-button'>
                        <span className='enter-button-value'>Регистрация</span> <ArrorIconSvg />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
