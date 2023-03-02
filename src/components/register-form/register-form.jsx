import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AccountForm } from './account-form';
import { UserForm } from './user-form';
import { AddressForm } from './address-form';
import { useMultistepForm } from '../../pages/registration/use-multiply-step';
import { registration } from '../../store/user-reducer';

import './register-form.scss';

const defaultRegisterValues = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
};

// export const schema = yup.object().shape({
//   username: yup
//     .string()
//     .trim()
//     .required('Поле не может быть пустым.')
//     .matches(/^.*((?=.*[a-zA-Z]){1}).*$/, 'латинский алфавит')
//     .matches(/^.*((?=.*[0-9]){1}).*$/, 'цифры'),

//   email: yup.string().email('Please enter a valid email format !').required('Поле не может быть пустым'),
//   password: yup
//     .string()
//     .required('Поле не может быть пустым')
//     .min(8, 'не менее 8 символов,'),

// //   firstName,
// //   lastName,
// //   phone,
// });

export const RegistrationForm = () => {
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPassworsValid, setIsPasswordValid] = useState(false);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (isUsernameValid && isPassworsValid) {
  //       console.log('====================================');
  //       console.log('someDataIsValid');
  //       console.log('====================================');
  //     }
  //   }, [isPassworsValid, isUsernameValid]);

  const {
    register,
    control,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: defaultRegisterValues,
    mode: 'all',
    //  resolver: yupResolver(schema),
  });

  const { steps, currentStepIndex, step, isFirstStep, isSecondStep, isLastStep, next } = useMultistepForm([
    <UserForm />,
    <AddressForm />,
    <AccountForm />,
  ]);

  const onSubmit = (data) => {
    if (!isLastStep ) {
      next();
    } else if (!isFirstStep) {
      dispatch(registration(data));
    }
  };

  //   const checkValidationAndGoNextStep=()=>{
  //     if (!errors.username?.message && !errors.password?.message){
  //         next();
  //     }
  //   }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
      {isFirstStep && (
        <AccountForm
          username='username'
          password='password'
          register={register}
          errorName={errors?.username}
          errorPassword={errors?.password}
        />
      )}
      {step === 2 && (
        <UserForm
          firstName='firstName'
          lastName='lastName'
          register={register}
          errorFirstName={errors?.firstName}
          errorLastName={errors?.lastName}
        />
      )}
      {step === 3 && (
        <AddressForm
          phone='phone'
          email='email'
          register={register}
          errorPhone={errors?.phone}
          errorEmail={errors?.email}
        />
      )}
      {/* {isFirstStep && <button type='button' onClick={checkValidationAndGoNextStep}>следующий шаг</button>}
      {isSecondStep && <button type='button'>последний шаг</button>} */}

      <input
        type='submit'
        value={isSecondStep ? 'последний шаг' : isLastStep ? 'зарегистрироваться' : 'следующий шаг'}
        className='submit-form-button'
      />
    </form>
  );
};
