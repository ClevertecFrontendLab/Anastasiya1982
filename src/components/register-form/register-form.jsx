import { useForm } from 'react-hook-form';

import './register-form.scss';

const defaultRegisterValues = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
};


export const RegistrationForm = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: defaultRegisterValues,
  });

 console.log('====================================');
 console.log(watch());
 console.log('====================================');

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='submit' value='следующий шаг' className='submit-form-button' />
    </form>
  );
};
