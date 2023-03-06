import { useState, useCallback } from 'react';
import { Highlight } from '../hightligth-element/hightligth-element';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';

import './input-in-form.scss';

export const Input = ({ label, register, type = 'text', placeholder, errors,  errorMessage, isValidOnBlur, onBlur, onFocus}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  }; 
 

  const ligthElementWhileFilter = useCallback((str) => <Highlight filter={errors?.message} str={str} />, [errors]);

  return (
    <div className='input-item'>
      <input
        {...register(label)}
        className={errors?.message ? 'error' : 'form-input'}
        type={type === 'password' ? (passwordShown ? 'text' : 'password') : 'text'}
        placeholder=' '
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {/* <label className='form-label'>{placeholder}</label>
      {errors?.type === 'required' && errors?.message && <p className='error-message-text'>{errors?.message}</p>}
      {errors?.type !== 'required' && errors?.message && (
        <p className={isValidOnBlur ? 'error-message-text-matched full' : 'error-message-text-matched'}>
          {ligthElementWhileFilter(errorMessage)}
        </p>
      )}

      {type === 'password' && passwordShown && (
        <OpenEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      )}
      {type === 'password' && !passwordShown && (
        <CloseEye className='show-password-icon' onClick={togglePasswordVisiblity} />
      )} */}
    </div>
  );
};
