import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Input } from '../input-in-form/input-in-form';

import './login-form.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <Input label='username' placeholder='Логин' register={register} errors={errors.username} />
      <Input label='password' placeholder='Пароль' register={register} />
      <Link to='/forgot-password' className='forgot-password-link'>
        Забли логин или пароль?
      </Link>
   
      <input type='submit' className='submit-form-button' value='вход' />
    </form>
  );
};
