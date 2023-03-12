import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailForgotPassword } from '../../../../store/user-reducer';

import { EmailInput } from './email-input';

import './forgot-pass-form.scss';

export const ForgotPassForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const watchEmail = watch('email', '');
  const onSubmit = (data) => {
    dispatch(sendEmailForgotPassword(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='forgor-pass-form' data-test-id='send-email-form'>
      <EmailInput
        label='email'
        register={register}
        required={true}
        placeholder=' '
        validateErrors={errors?.email}
        clearErrors={clearErrors}
        watchEmail={watchEmail}
      />
      <button type='submit' className='submit-form-button'>
        восстановить
      </button>
    </form>
  );
};
