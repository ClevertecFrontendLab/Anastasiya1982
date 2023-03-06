import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user-reducer';
import { InputLoginForm } from './input-login-form';

import './login-form.scss';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.userData.userAuthError);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'all',
  });

  const watchPassword = watch('password', '');

  const onSubmit = (data) => {
    dispatch(login(data));
    navigate('/books/all');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form' data-test-id='auth-form'>
      <InputLoginForm
        label='identifier'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.identifier}
        clearErrors={clearErrors}
        inputType='text'
      />

      <InputLoginForm
        label='password'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.password}
        inputType='password'
        watchPassword={watchPassword}
      />
      <button
        type='button'
        onClick={() => navigate('/forgot-pass')}
        className={!error ? 'forgot-password-link' : 'forgot-password-link hidden'}
      >
        Забыли логин или пароль?
      </button>
      {error && (
        <div className='error-block'>
          <span className='error-message-text' data-test-id='hint'>
            Неверный логин или пароль!
          </span>
          <Link className='restore-pass-link'>Восстановить?</Link>
        </div>
      )}
      <button type='submit' className='submit-form-button'>
        вход
      </button>
    </form>
  );
};
