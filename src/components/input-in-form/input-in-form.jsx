import { useState } from 'react';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';

import './input-in-form.scss';

export const Input = ({ label, register, type = 'text', placeholder, errors }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className='input-item'>
      <input
        {...register(label, {
          required: 'Поле не может быть пустым',
        })}
        className={errors?.message ? 'error' : 'form-input'}
        type={type === 'password' ? (passwordShown ? 'text' : 'password') : 'text'}
        placeholder=' '
      />

      <label className='form-label'>{placeholder}</label>
      {errors?.message ? <p className='error-message-text'>{errors?.message}</p> : ''}
      {type === 'password' && passwordShown && (
        <OpenEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      )}
      {type === 'password' && !passwordShown && (
        <CloseEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      )}
    </div>
  );
};
