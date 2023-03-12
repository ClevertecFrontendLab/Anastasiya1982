import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrorIconSvg } from '../../assets/arror-icon.svg';
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
    <div className='register-form-wrapper'>
      <h4 className='form-title'>Регистрация</h4>
      <div className='step-number-block'> 2 шаг из 3</div>
      <div className='form-container'>
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
      </div>
      <div className='enter-block'>
        <span className='enter-block-title'>Есть учётная запись?</span>
        <Link to='/auth' className='enter-block-button'>
          <span>Войти</span>
          <ArrorIconSvg style={{ marginLeft: '15px' }} />{' '}
        </Link>
      </div>
    </div>
  );
};
