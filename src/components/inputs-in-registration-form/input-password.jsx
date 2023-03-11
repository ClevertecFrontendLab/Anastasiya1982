import { useState, useEffect, useCallback } from 'react';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';
import { ReactComponent as ValidIcon } from '../../assets/valid-success-icon.svg';

import './input-in-form.scss';

export const RegisterPasswordInput = ({
  label,
  register,
  placeholder,
  validateErrors,
  watchPass,
  isPasswordError,
  setPasswordError,
  checkIfPasswordValid,
}) => {
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
    if (validateErrors && watchPass.length > 0) {
      setIsPassInputOnBlur(true);
      setIsLengthValid(false);
      setIsCupLetterValid(false);
      setIsNumberValid(false);
      setBlurOnEmptyInput(false);
    } else if (!validateErrors && watchPass.length === 0) {
      setBlurOnEmptyInput(true);
    } else {
      setIsPassInputOnBlur(false);
      setBlurOnEmptyInput(false);
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

  useEffect(() => {
    if (watchPass.length > 0 && !validateErrors) {
      checkIfPasswordValid(true);
    } else {
      checkIfPasswordValid(false);
    }
  }, [watchPass, validateErrors, checkIfPasswordValid]);

  return (
    <div className='input-item'>
      <input
        {...register(label)}
        className={validateErrors?.message ? 'form-input error' : 'form-input'}
        placeholder=' '
        type={passwordShown ? 'text' : 'password'}
        onBlur={checkIfInputValid}
        onFocus={() => {         
            setIsPassInputOnBlur(false);
            setBlurOnEmptyInput(false);
            validateNumber();
            validateCupLetter();
            validateLength();
            setPasswordError(false);          
        }}
      />
      <label className={watchPass.length > 0 ? 'form-label' : ''}>{placeholder}</label>
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
      {validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {!isPasswordError && blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isPasswordError && !blurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}

      {!blurOnEmptyInput && !isPasswordError && validateErrors?.type !== 'reqired' && (
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
    </div>
  );
};
