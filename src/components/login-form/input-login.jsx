import './login-form.scss';

export const InputLogin = ({ label, register, loginError, required, placeholder, validateErrors }) => (
  <div className='login-input-item'>
    <input
      {...register('identifier',{required})}
      className={loginError ? 'form-input error' : 'form-input'}
      placeholder={placeholder}
      type='text'
    />
    <span className='form-label'>Логин</span>
    {validateErrors?.type === 'required' && (
      <p data-test-id='hint' className='require-message'>
        Поле не может быть пустым
      </p>
    )}
    
  </div>
);