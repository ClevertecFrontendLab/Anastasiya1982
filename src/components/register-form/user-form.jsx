import { Input } from '../input-in-form/input-in-form';
import './register-form.scss';

export function UserForm({ firstName, lastName, register, errorFirstName, errorLastName }) {
  return (
    <div className='input-container'>
      <Input label={firstName} placeholder='Имя' register={register} errors={errorFirstName} />

      <Input label={lastName} register={register} placeholder='Фамилия' errors={errorLastName} />
    </div>
  );
}
