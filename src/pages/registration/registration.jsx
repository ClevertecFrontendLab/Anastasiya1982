import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';
import { RegistrationForm } from '../../components/register-form/register-form';
import { setUserRegisterDataError, resetRegistratonOnFirstStep } from '../../store/user-reducer';
import { ReactComponent as ArrorIconSvg } from '../../assets/arror-icon.svg';

import { setCurrentStepIndex } from '../../store/registration-reducer';

import './registration.scss';

export const ModalWithRegisterForm = () => {
  const steps = useSelector((store) => store.registration.steps);
  const currentStepIndex = useSelector((store) => store.registration.currentStepIndex);
 
  const user = useSelector((store) => store.userData.userData);
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);

  return (
    <div className='register-form-wrapper' >
      <h4 className='form-title'>Регистрация</h4>
      <div className='step-number-block'> {steps[currentStepIndex]} шаг из 3</div>
      <div className='form-container'>
        <RegistrationForm />
      </div>
      <div className='enter-block'>
        <span className='enter-block-title'>Есть учётная запись?</span>
        <Link to='/auth' className='enter-block-button'>
          <span>Войти</span>
          <ArrorIconSvg style={{ marginLeft: '15px' }} />
        </Link>
      </div>
    </div>
  );
};


export const RegistrationPage = () => {
  const successfulRegistration = useSelector((store) => store.userData.successfulRegistration);
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);
  const error = useSelector((store) => store.userData.userDataError);
  const responseInfo = useSelector((state) => state.userData.authInfo);
  const isAuth = localStorage.getItem('isAuth');
  const navigate = useNavigate();
  const dispatch=useDispatch();


  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onClickModalButton = () => {
    if (successfulRegistration) {
      navigate('/auth');
    }
     else {
        
    dispatch(resetRegistratonOnFirstStep());
    dispatch(setCurrentStepIndex(0))
    }
}

  return (
    <div className='register-page'>
      {isUserDataLoading && <Loader />}
      <div className='register-page-wrapper'>
        <h3 className='register-page-header'>Cleverland</h3>
        <div className='form-container' data-test-id='auth'>
          {responseInfo.info ? (
            <div data-test-id='status-block' className='register-form-wrapper status'>
              <h4>{`${successfulRegistration ? 'Регистрация успешна' : 'Данные не сохранились'}`}</h4>
              <div className='form-content'>{responseInfo.info}</div>
              <button type='button' onClick={onClickModalButton} className='enter-block-button'>
                {`${
                  successfulRegistration ? 'Вход' : responseInfo.status === 400 ? 'Назад к регистрации' : 'Повторить'
                }`}
              </button>
            </div>
          ) : (
            <ModalWithRegisterForm />
          )}
        </div>
      </div>
    </div>
  );
}
