import { useState, useEffect } from 'react';

export const LastNameInput = ({
  label,
  register,
  placeholder,
  validateErrors,
  watchPass,
  checkIfLastNameValid,
  isLastNameError,
  setIsLastNameError,
}) => {
  const [isBlurOnEmptyInput, setBlurOnEmptyInput] = useState(false);

  const checkIfInputValid = () => {
    if (!validateErrors && watchPass.length === 0) {
      setBlurOnEmptyInput(true);
    } else if (validateErrors && watchPass.length > 0) {
      setBlurOnEmptyInput(false);
    } else if (isLastNameError) {
      setBlurOnEmptyInput(false);
    } else {
      setBlurOnEmptyInput(false);
    }
  };

  useEffect(() => {
    if (watchPass.length > 0 && !validateErrors) {
      checkIfLastNameValid(true);
    }
  }, [watchPass, validateErrors, checkIfLastNameValid]);

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
          checkIfLastNameValid(false);
          setIsLastNameError(false);
        }}
      />
      <label className={watchPass.length > 0 ? 'form-label' : ''}>{placeholder}</label>
      {validateErrors?.type === 'required' && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isBlurOnEmptyInput && !isLastNameError && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
      {isLastNameError && (
        <p className='validation-pass-message' data-test-id='hint'>
          Поле не может быть пустым
        </p>
      )}
    </div>
  );
};
