import { useState, Fragment, useSelector } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ReactComponent as ArrorIconSvg } from '../../assets/arror-icon.svg';
 
import { Input } from '../input/input';

import './register-form.scss';

export const AccountForm = ({ addData }) => {
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const classErrorSpan = (errorVariable) => `${errorVariable ? 'markErrorText' : ''}`;
  const classFullError = (field) =>
    `${
      errors[field] && (field === 'username' ? !isFocused.username : !isFocused.password)
        ? 'markErrorText'
        : 'fullErrorText'
    }`;

  const onSubmit = (data) => {
    addData(data);
  };

  return (
    <div className='register-form-wrapper'>
      <h4 className='form-title'>Регистрация</h4>
      <div className='step-number-block'> 1 шаг из 3</div>
      <div className='form-container'>
        <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)} className='register-form'>
          <div style={{ width: '100%' }}>
            <Input
              placeholder='Придумайте логин для входа'
              isError={!!errors.username}
              {...register('username', {
                required: 'Поле не может быть пустым',
                validate: {
                  digitRequired: (value) => !!value.match(/[0-9]/),
                  latinRequired: (value) => !value.match(/[^a-zA-Z0-9]/) && !!value.match(/[a-zA-z]/),
                },
                onBlur: () => {
                  setIsFocused({ ...isFocused, username: false });
                },
                onChange: () => {
                  setIsFocused({ ...isFocused, username: true });
                },
              })}
            />
            <div data-test-id='hint' className={classFullError('username')}>
              {errors.username?.type === 'required' && !isFocused.username ? (
                errors.username.message
              ) : (
                <Fragment>
                  Используйте для логина{' '}
                  <span className={`${classErrorSpan(!!errors.username?.types?.latinRequired)} 'errorText`}>
                    латинский алфавит
                  </span>{' '}
                  и{' '}
                  <span className={`${classErrorSpan(!!errors.username?.types?.digitRequired)} 'errorText'`}>
                    цифры
                  </span>
                </Fragment>
              )}
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <Input
              type='password'
              checkMark={!errors.password && watch('password')}
              placeholder='Пароль'
              isError={!!errors.password}
              {...register('password', {
                required: 'Поле не может быть пустым',
                validate: {
                  minLength: (value) => value?.length >= 8,
                  capitalLetterRequired: (value) => !!value.match(/[A-ZА-ЯЁ]/),
                  digitRequired: (value) => !!value.match(/[0-9]/),
                },
                onBlur: () => {
                  setIsFocused({ ...isFocused, password: false });
                },
                onChange: () => {
                  setIsFocused({ ...isFocused, password: true });
                },
              })}
            />
            <div data-test-id='hint' className={classFullError('password')}>
              {errors.password?.type === 'required' && !isFocused.password ? (
                errors.password.message
              ) : (
                <Fragment>
                  Пароль{' '}
                  <span className={`${classErrorSpan(!!errors.password?.types?.minLength)} 'errorText' `}>
                    не менее 8 символов
                  </span>
                  , с{' '}
                  <span className={`${classErrorSpan(!!errors.password?.types?.capitalLetterRequired)} 'errorText' `}>
                    заглавной буквой
                  </span>{' '}
                  и{' '}
                  <span className={`${classErrorSpan(!!errors.password?.types?.digitRequired)} 'errorText' `}>
                    цифрой
                  </span>
                </Fragment>
              )}
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <button
              type='submit'
              className='submit-form-button'
              disabled={!!errors.password || !!errors.username || !watch('password') || !watch('username')}
            >
              следующий шаг
            </button>
          </div>
        </form>
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
