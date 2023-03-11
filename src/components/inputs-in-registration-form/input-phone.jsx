import { useState, useEffect,Ref } from 'react';
import { Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { authRegexp } from '../../shared/constants/regexp-constants';

import './input-in-form.scss';

 const patternPhoneNumber = [
     '+',
     '3',
     '7',
     '5',
     ' ',
     '(',
     /(2|3|4)/,
     /(9|3|4)/,
     ')',
     ' ',
     /\d/,
     /\d/,
     /\d/,
     '-',
     /\d/,
     /\d/,
     '-',
     /\d/,
     /\d/,
   ];

export const RegisterPhoneInput = ({
  label,
  register,
  placeholder,
  validateErrors,
  watchPhone,
  checkIfPhoneValid,
  isPhoneError,
  setIsPhoneError,
  control
}) => {
  const [blurOnEmptyInput, setBlurOnEmptyInput] = useState(false);

  useEffect(() => {
    if (watchPhone.length > 0 && !validateErrors) {
       checkIfPhoneValid(true);
    } else {
       checkIfPhoneValid(false);
    }
  }, [watchPhone, validateErrors,  checkIfPhoneValid]);

  return (
    <div className='input-item'>
    
      <input
        {...register(label)}
        className={validateErrors ? 'form-input error' : 'form-input'}
        placeholder=' '
        // onBlur={() => {
        //   if (!validateErrors && !watchEmail.length) {
        //     setBlurOnEmptyInput(true);
        //   } else {
        //     setBlurOnEmptyInput(false);
        //   }
        // }}
        // onFocus={() => {
        //   setBlurOnEmptyInput(false);
        //   checkIfEmailValid(false);
        //   setIsEmailError(false);
        // }}
      />
      <label className={watchPhone.length > 0 ? 'form-label' : ''}>{placeholder}</label>
      {/* {validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isPhoneError && !blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {!isPhoneError && blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {validateErrors?.message && watchPhone.length > 0 && (
        <p className='validation-pass-message' data-test-id='hint'>
          Введите корректный e-mail
        </p>
      )} */}
    </div>
  );
};
