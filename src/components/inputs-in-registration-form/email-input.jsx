import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

import './input-in-form.scss';

// const PATTERN = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

export const RegisterEmailInput = ({
  label,
  register,
  placeholder,
  validateErrors,
  watchEmail,
  checkIfEmailValid,
  isEmailError,
  setIsEmailError,
}) => {
    const [blurOnEmptyInput, setBlurOnEmptyInput] = useState(false);

     useEffect(() => {
       if (watchEmail.length > 0 && !validateErrors) {
         checkIfEmailValid(true);
       } else {
         checkIfEmailValid(false);
       }
     }, [watchEmail, validateErrors, checkIfEmailValid]);

  return (
    <div className='input-item'>
      <input
        {...register(label)}
        className={validateErrors ? 'form-input error' : 'form-input'}
        placeholder=' '
        onBlur={() => {
          if (!validateErrors && !watchEmail.length) {
            setBlurOnEmptyInput(true);
          } else {
            setBlurOnEmptyInput(false);
          }
        }}
        onFocus={() => {
          setBlurOnEmptyInput(false);
          checkIfEmailValid(false);
          setIsEmailError(false)
        }}
      />
      <label className={watchEmail.length > 0 ? 'form-label' : ''}>{placeholder}</label>
      {validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isEmailError && !blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {!isEmailError && blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {validateErrors?.message && watchEmail.length > 0 && (
        <p className='validation-pass-message' data-test-id='hint'>
          Введите корректный e-mail
        </p>
      )}
    </div>
  );
};
