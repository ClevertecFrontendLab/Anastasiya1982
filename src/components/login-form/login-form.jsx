import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user-reducer';
import { InputLogin } from './input-login';
import { InputPassword } from './input-password';


import './login-form.scss';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.userData.userAuthError);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors   
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    navigate('/books/all')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form' data-test-id='auth-form'>
      <InputLogin
        label='identifier'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.identifier}
        clearErrors={clearErrors}
      />

      <InputPassword
        label='password'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.password}
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
