import { Ref } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { authRegexp } from '../../shared/constants/regexp-constants';
import { Input } from '../input/input';


import './register-form.scss';

export const AddressForm = ({ addData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      phone: '',
      email: '',
    },
  });

  const classPhoneError = `${errors.phone && 'markErrorText'}`;

  const onSubmit = (data) => {
    addData(data);
  };

  const patternPhoneNumber = [
    '+',
    '3',
    '7',
    '5',
    ' ',
    '(',
    /(2|3|4)/,
    /(9|3|4)/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  return (
    <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)} className='register-form'>
      <div style={{ width: '100%' }}>
        <Controller
          name='phone'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedInput
              mask={patternPhoneNumber}
              placeholderChar='x'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              render={(ref, props) => (
                <Input placeholder='Номер телефона' name='phone' ref={ref} type='tel' {...props} />
              )}
            />
          )}
          rules={{
            required: 'Поле не может быть пустым',
            pattern: authRegexp.phone,
          }}
        />
        <div data-test-id='hint' type='large' className={`${classPhoneError} 'fullErrorText'`}>
          {errors.phone?.types?.required ? errors.phone?.message : 'В формате +375 (xx) xxx-xx-xx'}
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <Input
          placeholder='E-mail'
          isError={!!errors.email}
          {...register('email', {
            required: 'Поле не может быть пустым',
            pattern: {
              value: authRegexp.email,
              message: 'Введите корректный e-mail',
            },
          })}
        />
        {errors.email?.message && (
          <div data-test-id='hint' type='large' className='markErrorText'>
            {errors.email?.message}
          </div>
        )}
      </div>
      <div style={{ width: '100%' }}>
        <button
          type='submit'
          className='submit-form-button'
          disabled={!!errors.email || !!errors.phone || !watch('email') || !watch('phone')}
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};
