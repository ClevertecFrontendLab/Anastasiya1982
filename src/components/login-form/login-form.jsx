import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user-reducer';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';

import './login-form.scss';

const InputLogin = ({ label, register, loginError, required, placeholder, validateErrors}) => (
  <div className='login-input-item'>
    <input
      {...register(label, { required })}
      className={loginError ? 'form-input error' : 'form-input'}
      placeholder={placeholder}
     
    />
    <label className='form-label'>{label}</label>
    {validateErrors?.type === 'required' && <p className='require-message'>Поле не может быть пустым</p>}
  </div>
);

const InputPassword = ({ label, register, loginError, required, placeholder, validateErrors }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className='login-input-item'>
      <input
        {...register(label, { required })}
        className={loginError ? 'form-input error' : 'form-input'}
        placeholder={placeholder}
        type={passwordShown?'text':'password'}
        
      />
      <label className='form-label'>{label}</label>
      {passwordShown ? (
        <OpenEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      ) : (
        <CloseEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      )}
      {validateErrors?.type === 'required' && <p className='require-message'>Поле не может быть пустым</p>}
    </div>
  );
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.userData.userAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
   clearErrors,
    watch,
    clearError,
  } = useForm({
    defaultValues: {
      Логин: '',
      Пароль: '',
    },
    mode:'onSubmit'
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <InputLogin
        label='Логин'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.Логин}
        clearErrors={clearErrors}
      />
     
      <InputPassword
        label='Пароль'
        register={register}
        loginError={error}
        required={true}
        placeholder=' '
        validateErrors={errors?.Пароль}
      />

      {!error ? (
        <Link to='/forgot-password' className='forgot-password-link'>
          Забли логин или пароль?
        </Link>
      ) : (
        <div className='error-block'>
          <span className='error-message-text'>Неверный логин или пароль!</span>
          <Link className='restore-pass-link'>Восстановить?</Link>
        </div>
      )}

      <input type='submit' className='submit-form-button' value='вход' />
    </form>
  );
};
