import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user-reducer';

import { Input } from '../input/input';

import './login-form.scss';

export const LoginForm = () => {
  const [badRequestError, toggleBadRequestError] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((store) => store.userData.authInfo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data) => {
    const action = dispatch(login(data));
    navigate('/books/all');
  };

  useEffect(() => {
    if (error.status === 400) {
      toggleBadRequestError(true);
    } else {
      toggleBadRequestError(false);
    }
  }, [error]);

  return (
    <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <div style={{ width: '100%' }}>
        <Input
          type='text'
          placeholder='Логин'
          {...register('identifier', {
            required: 'Поле не может быть пустым',
          })}
        />
        {errors.identifier?.message && (
          <div data-test-id='hint' style={{ color: '#F42C4F' }}>
            {errors.identifier?.message}
          </div>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <div className='password-block'>
          <Input
            placeholder='Пароль'
            type='password'
            {...register('password', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.password?.message && !badRequestError && (
            <div data-test-id='hint' style={{ color: '#F42C4F' }}>
              {errors.password?.message}
            </div>
          )}
        </div>
        <div>
          <div className={badRequestError ? 'active-bad-request-error' : 'not-active-bad-request-error'}>
            <div data-test-id='hint' style={{ color: '#F42C4F' }}>
              Неверный логин или пароль!
            </div>
          </div>
          <Link to='/forgot-pass'>
            <div style={{ color: `${badRequestError ? '#363636' : '#A7A7A7'}` }}>
              {badRequestError ? 'Восстановить?' : 'Забыли логин или пароль?'}
            </div>
          </Link>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <button className='submit-form-button' type='submit'>
          Вход
        </button>
      </div>
    </form>
  );
};
