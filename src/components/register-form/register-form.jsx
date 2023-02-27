import { useForm } from 'react-hook-form';

import { AccountForm } from './account-form';
import { UserForm } from './user-form';
import { AddressForm } from './address-form';
import { useMultistepForm } from '../../pages/registration/use-multiply-step';


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

   const { steps, currentStepIndex, step, isFirstStep, isSecondStep, isLastStep, back, next } = useMultistepForm([
      <UserForm  />,
      <AddressForm  />,
     <AccountForm />,
   ]);

 

  const onSubmit = (data) => {
    if(!isLastStep) {
       next();
    }   
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
      {step === 1 && (
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
      {step === 3 && <AddressForm phone='phone' email='email' register={register} errorPhone={errors?.phone}  errorEmail={errors?.email}/>}
      <input
        type='submit'
        value={isSecondStep ? 'последний шаг' : isLastStep ? 'зарегистрироваться' : 'следующий шаг'}
        className='submit-form-button'
      />
    </form>
  );
};
