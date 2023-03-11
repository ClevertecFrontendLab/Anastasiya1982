import { useForm } from 'react-hook-form';
import { Input } from '../input/input';

import './register-form.scss';

export const UserForm = ({ addData }) => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data) => {
    addData(data);
  };

  return (
    <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)} className='register-form'>
      <div style={{ width: '100%' }}>
        <Input
          placeholder='Имя'
          isError={!!errors.firstName}
          {...register('firstName', {
            required: 'Поле не может быть пустым',
          })}
        />
        {errors.firstName?.message && (
          <div data-test-id='hint' type='large' className='markErrorText'>
            {errors.firstName?.message}
          </div>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <Input
          placeholder='Фамилия'
          isError={!!errors.lastName}
          {...register('lastName', {
            required: 'Поле не может быть пустым',
          })}
        />
        {errors.lastName?.message && (
          <div data-test-id='hint' type='large' className='markErrorText'>
            {errors.lastName?.message}
          </div>
        )}
      </div>
      <div style={{ width: '100%' }}>              
        <button
          type='submit'
          className='submit-form-button'
          disabled={!!errors.firstName || !!errors.lastName || !watch('firstName') || !watch('lastName')}
        >
          Последний шаг
        </button>
      </div>
    </form>
  );
};
