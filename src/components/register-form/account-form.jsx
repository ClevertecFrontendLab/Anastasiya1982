import { Input } from '../input-in-form/input-in-form';

import './register-form.scss';

export function AccountForm({ username, password, register, errorName, errorPassword }) {
  return (
    <div className='input-container'>
      <Input label={username} placeholder='Придумайте логин для входа' register={register} errors={errorName} />

      <Input label={password} register={register} placeholder='Пароль' type='password' errors={errorPassword} />
    </div>
  );
}

