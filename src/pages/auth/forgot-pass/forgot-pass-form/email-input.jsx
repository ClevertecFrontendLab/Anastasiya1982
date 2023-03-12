import { useState } from 'react';
import { useSelector } from 'react-redux';

import './forgot-pass-form.scss';

const PATTERN = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

export const EmailInput = ({ label, register, placeholder, validateErrors, watchEmail }) => {
  const restoreEmailError = useSelector((store) => store.userData.restoreEmailError);
  const isRestoreEmailSend = useSelector((store) => store.userData.isRestoreEmailSend);

  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  return (
    <div className='email-input-item'>
      <input
        {...register(label, {
          required: true,
          pattern: PATTERN,
        })}
        className={validateErrors ? 'form-input error' : 'form-input'}
        placeholder={placeholder}
        onBlur={() => {
          if (!validateErrors && watchEmail.length === 0) {
            setIsEmailEmpty(true);
          } else {
            setIsEmailEmpty(false);
          }
        }}
        onFocus={() => {
          setIsEmailEmpty(false);
        }}
      />
      <span className='form-label'>Email</span>
      {validateErrors?.type === 'required' && (
        <p data-test-id='hint' className='error-message'>
          Поле не может быть пустым
        </p>
      )}
      {isEmailEmpty && (
        <p data-test-id='hint' className='error-message'>
          Поле не может быть пустым
        </p>
      )}
      {validateErrors?.type === 'pattern' && (
        <p data-test-id='hint' className='error-message'>
          Введите корректный e-mail
        </p>
      )}
      {restoreEmailError?.status && (
        <p data-test-id='hint' className='error-message'>
          error
        </p>
      )}
      <p className='email-input-hint'>На это email будет отправлено письмо с инструкциями по восстановлению пароля</p>
    </div>
  );
};
