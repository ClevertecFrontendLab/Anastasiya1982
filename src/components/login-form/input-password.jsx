import { useState } from "react";

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';

import './login-form.scss';

export const InputPassword = ({ label, register, loginError, required, placeholder, validateErrors }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className='login-input-item'>
      <input
        {...register('password',{required})}
        className={loginError ? 'form-input error' : 'form-input'}
        placeholder={placeholder}
        type={passwordShown ? 'text' : 'password'}
      />
      <span className='form-label'>Пароль</span>
      {passwordShown ? (
        <OpenEye className='show-password-icon' data-test-id='eye-opened' onClick={togglePasswordVisiblity} />
      ) : (
        <CloseEye className='show-password-icon' data-test-id='eye-closed' onClick={togglePasswordVisiblity} />
      )}
      {validateErrors?.type === 'required' && (
        <p data-test-id='hint' className='require-message'>
          Поле не может быть пустым
        </p>
      )}
    </div>
  );
};