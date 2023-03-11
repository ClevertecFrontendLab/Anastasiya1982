import { useState, useCallback, useEffect } from 'react';

import './input-in-form.scss';

export const InputUsername = ({
  label,
  register,
  type = 'text',
  placeholder,
  validateErrors,
  watchPass,
  checkIfUsernameValid,
   isUserNameError,
      setIsUserNameError
}) => {
  const [isLatinLetterValid, setIsLatinLetterValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isInputOnBlur, setIsInputOnBlur] = useState(false);
  const [isBlurOnEmptyInput, setBlurOnEmptyInput] = useState(false);

  const validateLatinLetter = useCallback(() => {
    if (watchPass.match(/^.*((?=.*[a-zA-Z]){1}).*$/)) {
      setIsLatinLetterValid(true);
    } else {
      setIsLatinLetterValid(false);
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
    validateLatinLetter();
    validateNumber();
  }, [watchPass, validateNumber, validateLatinLetter]);

  const checkIfInputValid = () => {
    if (!validateErrors && watchPass.length === 0) {
      setBlurOnEmptyInput(true);
    } else if (validateErrors && watchPass.length > 0) {
      setIsInputOnBlur(true);
      setBlurOnEmptyInput(false);
      setIsNumberValid(false);
      setIsLatinLetterValid(false);
    } else {
      setBlurOnEmptyInput(false);
      setIsInputOnBlur(false);
    }
  };

  useEffect(() => {
    if (watchPass.length > 0 && !validateErrors) {
      checkIfUsernameValid(true);
    } else {
      checkIfUsernameValid(false);
    }
  }, [watchPass, validateErrors, checkIfUsernameValid]);

  return (
    <div className='input-item'>
      <input
        {...register(label)}
        className={validateErrors?.message ? 'form-input error' : 'form-input'}
        type='text'
        placeholder=' '
        onBlur={checkIfInputValid}
        onFocus={() => {
          setIsInputOnBlur(false);
          setBlurOnEmptyInput(false);
          validateLatinLetter();
          validateNumber();
          setIsUserNameError(false);
        }}
      />
      <label className={watchPass.length > 0 ? 'form-label' : ''}>{placeholder}</label>
      {validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isBlurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isUserNameError && !isBlurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {!isUserNameError && !isBlurOnEmptyInput && validateErrors?.type !== 'required' && (
        <p data-test-id='hint' className={!isInputOnBlur ? 'validation-message' : 'validation-message error'}>
          Используйте для логина{' '}
          <span className={!isLatinLetterValid && validateErrors?.message ? 'valid-span error' : 'valid-span'}>
            латинский алфавит
          </span>{' '}
          и <span className={!isNumberValid && validateErrors?.message ? 'valid-span error' : 'valid-span'}>цифры</span>
        </p>
      )}
    </div>
  );
};
