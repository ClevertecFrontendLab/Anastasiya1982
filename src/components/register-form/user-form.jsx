import { Input } from '../input-in-form/input-in-form';
import './register-form.scss';

export function UserForm({firstName, lastName, register}) {
  return (
    <div className='input-container'>
      <Input label={firstName}  placeholder='Имя' register={register} />

      <Input label={lastName} register={register}  placeholder='Фамилия' />
    </div>
  );
}
