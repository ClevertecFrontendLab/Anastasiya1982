import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input } from '../input-in-form/input-in-form';
import { login } from '../../store/user-reducer'; 

import './login-form.scss';

export const LoginForm = () => {
    const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearError,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
  });


  const onSubmit = (data) => {
dispatch(login(data))

  };


//   const onPasswordChange=watch('password')


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
