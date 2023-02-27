import { Input } from '../input-in-form/input-in-form';

import './register-form.scss';

export function AccountForm({ username, password, register }) {

  return (
    <div className='input-container'>
      <Input label={username}  placeholder='Придумайте логин для входа' register={register} />

      <Input label={password} register={register}  placeholder='Пароль' type="password" />
    </div>
  );
}

