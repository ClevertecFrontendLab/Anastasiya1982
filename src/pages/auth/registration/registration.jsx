import { useEffect, useState,Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/loader/loader';
import { registration, setAuthInfo } from '../../../store/user-reducer';
import { addRegistrationData } from '../../../store/registration-reducer';
import { AccountForm } from '../../../components/register-form/account-form';
import { UserForm } from '../../../components/register-form/user-form';
import { AddressForm } from '../../../components/register-form/address-form';

import './registration.scss';

export const RegistrationPage = () => {
    const [stepStatus, setStepStatus] = useState('first');
  const successfulRegistration = useSelector((store) => store.userData.successfulRegistration);
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);
  const error = useSelector((store) => store.userData.userDataError);
  const responseInfo = useSelector((state) => state.userData.authInfo);
  const registrationData = useSelector((store) => store.registration.registrationData);

  const isAuth = localStorage.getItem('isAuth');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onClickModalButton = () => {
    if (successfulRegistration) {
      navigate('/auth');
    } else {
    setStepStatus('first');
    }
    dispatch(setAuthInfo({ status: null, info: null }));
  };
  const addData = (data) => {
    dispatch(addRegistrationData(data));
    if (stepStatus === 'first') setStepStatus('second');
    if (stepStatus === 'second') setStepStatus('final');
    if (stepStatus === 'final') setStepStatus('data-collected');
  };

  useEffect(() => {
    if (stepStatus === 'data-collected') {
     dispatch(registration(registrationData));
    }
  }, [registrationData, stepStatus,dispatch]);

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
            <Fragment>
              {stepStatus === 'first' && <AccountForm addData={addData} />}
              {stepStatus === 'second' && <UserForm addData={addData} />}
              {stepStatus === 'final' && <AddressForm addData={addData} />}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
