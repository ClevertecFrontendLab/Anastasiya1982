import { useState, useEffect, useCallback } from 'react';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';
import { ReactComponent as ValidIcon } from '../../assets/valid-success-icon.svg';

export const PasswordInput = ({ label, register, placeholder, validateErrors, labelValue, watchPass }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPassInputOnBlur, setIsPassInputOnBlur] = useState(false);
  const [blurOnEmptyInput, setBlurOnEmptyInput] = useState(false);
  const [blurOnEmptyConfirmInput, setBlurOnEmptyConfirmInput] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isCupLetterValid, setIsCupLetterValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const checkIfInputValid = () => {
    if (label === 'password') {
      if (validateErrors && watchPass.length > 0) {
        setIsPassInputOnBlur(true);
        setIsLengthValid(false);
        setIsCupLetterValid(false);
        setIsNumberValid(false);
        setBlurOnEmptyInput(false)
      } else if (!validateErrors && watchPass.length === 0) {
        setBlurOnEmptyInput(true);
      } else {
        setIsPassInputOnBlur(false);
        setBlurOnEmptyInput(false);
      }
    }
     if (label === 'passwordConfirmation') {      
        if (!validateErrors && watchPass.length === 0) {
         setBlurOnEmptyConfirmInput(true);
       } else {
         setBlurOnEmptyConfirmInput(false);
         
       }
     }
  };

  const validateLength = useCallback(() => {
    if (watchPass.length >= 8) {
      setIsLengthValid(true);
    } else {
      setIsLengthValid(false);
    }
  }, [watchPass]);

  const validateCupLetter = useCallback(() => {
    if (watchPass.match(/^.*((?=.*[А-ЯA-Z]){1}).*$/)) {
      setIsCupLetterValid(true);
    } else {
      setIsCupLetterValid(false);
    }
  }, [watchPass]);

  const validateNumber = useCallback(() => {
    if (watchPass.match(/^.*((?=.*[0-9]){1}).*$/)) {
      setIsNumberValid(true);
    } else {
      setIsNumberValid(false);
    }
  }, [watchPass]);

  useEffect(() => {
    validateLength();
    validateCupLetter();
    validateNumber();
  }, [watchPass, validateCupLetter, validateNumber, validateLength]);

  return (
    <div className='password-input-item'>
      <input
        {...register(label)}
        className={validateErrors?.message ? 'form-input error' : 'form-input'}
        placeholder={placeholder}
        type={passwordShown ? 'text' : 'password'}
        onBlur={checkIfInputValid}
        onFocus={() => {
          if (label === 'password') {
            setIsPassInputOnBlur(false);
            setBlurOnEmptyInput(false);
            validateNumber();
            validateCupLetter();
            validateLength();
          }
           if (label === 'passwordConfirmation') {
             setBlurOnEmptyConfirmInput(false)
             
           }
        }}
      />
      {watchPass.length > 0 && (
        <button type='button' className='show-password-icon-container'>
          {passwordShown ? (
            <OpenEye className='show-password-icon' data-test-id='eye-opened' onClick={togglePasswordVisiblity} />
          ) : (
            <CloseEye className='show-password-icon' data-test-id='eye-closed' onClick={togglePasswordVisiblity} />
          )}
        </button>
      )}
      {label === 'password' && watchPass.length > 0 && !validateErrors ? (
        <button type='button' className='validation-success-icon' data-test-id='checkmark'>
          <ValidIcon />
        </button>
      ) : (
        ''
      )}
      {label === 'password' && validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {label === 'password' && blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}

      <span className='form-label'>{labelValue}</span>
      {label === 'password' && (
        <p className={!isPassInputOnBlur ? 'validation-message' : 'validation-message error'} data-test-id='hint'>
          Пароль{' '}
          <span className={!isLengthValid && validateErrors?.message ? 'valid-span error' : 'valid-span'}>
            не менее 8 символов
          </span>
          , с{' '}
          <span className={!isCupLetterValid && validateErrors?.message ? 'valid-span error' : 'valid-span'}>
            заглавной буквой
          </span>{' '}
          и{' '}
          <span className={!isNumberValid && validateErrors?.message ? 'valid-span error' : 'valid-span'}>цифрой</span>
        </p>
      )}
      {label === 'passwordConfirmation' && validateErrors?.type && (
        <p className='validation-confirm-message' data-test-id='hint'>
          Пароли не совпадают
        </p>
      )}
      {label === 'passwordConfirmation' && blurOnEmptyConfirmInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
    </div>
  );
};
