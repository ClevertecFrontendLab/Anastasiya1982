import { useState } from "react";

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';

import './login-form.scss';

export const InputLoginForm = ({
  label,
  register,
  loginError,
  required,
  placeholder,
  validateErrors,
  inputType,
  watchPassword,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const inputPlaceholder = label === 'password' ? 'Пароль' : 'Логин';
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className='login-input-item'>
      <input
        {...register(label, { required })}
        className={loginError ? 'form-input error' : 'form-input'}
        placeholder={placeholder}
        type={inputType === 'password' && !passwordShown ? 'password' : 'text'}
      />
      <span className='form-label'>{inputPlaceholder}</span>

      {validateErrors?.type === 'required' && (
        <p data-test-id='hint' className='require-message'>
          Поле не может быть пустым
        </p>
      )}
      {inputType === 'password' && watchPassword.length > 0 && (
        <button type='button' className='show-password-icon-container'>
          {passwordShown ? (
            <OpenEye className='show-password-icon' data-test-id='eye-opened' onClick={togglePasswordVisiblity} />
          ) : (
            <CloseEye className='show-password-icon' data-test-id='eye-closed' onClick={togglePasswordVisiblity} />
          )}
        </button>
      )}
    </div>
  );
};