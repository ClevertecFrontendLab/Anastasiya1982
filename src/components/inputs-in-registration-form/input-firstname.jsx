import { useState, useEffect } from 'react';

export const FirstNameInput = ({
  label,
  register,
  placeholder,
  validateErrors,
  watchPass,
  checkIfFirstNameValid,
  isFirstNameError,
  setIsFirstNameError,
}) => {
  const [isBlurOnEmptyInput, setBlurOnEmptyInput] = useState(false);

  const checkIfInputValid = () => {
    if (!validateErrors && !watchPass.length) {
      setBlurOnEmptyInput(true);
    } else if (validateErrors && watchPass.length > 0) {
      setBlurOnEmptyInput(false);
    } else if (isFirstNameError) {
      setBlurOnEmptyInput(false);
    } else {
      setBlurOnEmptyInput(false);
      setIsFirstNameError(false)
    }
  };

  useEffect(() => {
    if (watchPass.length > 0 && !validateErrors) {
      checkIfFirstNameValid(true);
    } else {
      checkIfFirstNameValid(false);
    }
  }, [watchPass, validateErrors, checkIfFirstNameValid]);

  return (
    <div className='input-item'>
      <input
        {...register(label)}
        className={validateErrors?.message ? 'form-input error' : 'form-input'}
        type='text'
        placeholder=' '
        onBlur={checkIfInputValid}
        onFocus={() => {
          setBlurOnEmptyInput(false);
          checkIfFirstNameValid(false);
          setIsFirstNameError(false);
        }}
      />
      <label className={watchPass.length > 0 ? 'form-label' : ''}>{placeholder}</label>
      {validateErrors?.type === 'required' &&
        !isFirstNameError &&(
          <p className='validation-pass-message' data-test-id='hint'>
            Поле не может быть пустым
          </p>
        )}
      {isBlurOnEmptyInput && !isFirstNameError && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isFirstNameError && !isBlurOnEmptyInput && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
     
    </div>
  );
};
