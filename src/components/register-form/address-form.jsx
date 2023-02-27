import { Input } from '../input-in-form/input-in-form';

import './register-form.scss';

export function AddressForm({ phone, email, register, errorPhone, errorEmail }) {
  return (
    <div className='input-container'>
      <Input label={phone} placeholder='Номер телефона' register={register} errors={errorPhone} />

      <Input label={email} register={register} placeholder='E-mail' errors={errorEmail} />
    </div>
  );
}
