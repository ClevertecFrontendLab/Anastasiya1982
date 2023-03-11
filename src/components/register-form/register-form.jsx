import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback, Fragment } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authRegexp } from '../../shared/constants/regexp-constants';
import { AccountForm } from './account-form';
import { UserForm } from './user-form';
import { AddressForm } from './address-form';
import { useMultistepForm } from '../../pages/registration/use-multiply-step';
import { addRegistrationData } from '../../store/registration-reducer';
import { registration } from '../../store/user-reducer';

import './register-form.scss';

export const RegistrationForm = () => {
  const dispatch = useDispatch();


  const { step, isFirstStep, isSecondStep, isLastStep, next, isDataCollected } = useMultistepForm([
    <UserForm />,
    <AddressForm />,
    <AccountForm />,
  ]);

  const navigate = useNavigate();

  const registrationData = useSelector((store) => store.registration.registrationData);

  const addData = (data) => {
    dispatch(addRegistrationData(data));
    if (isFirstStep) next();
    if (isSecondStep) next();
    if (isLastStep) next();
  };

  useEffect(() => {
    if (isDataCollected) {
     dispatch(registration(registrationData));
    }
  }, [dispatch, registrationData, isDataCollected]);

  return (
    <Fragment>
      {isFirstStep && <AccountForm addData={addData} />}
      {isSecondStep && <UserForm addData={addData} />}
      {isLastStep && <AddressForm addData={addData} />}
    </Fragment>
  );
};
