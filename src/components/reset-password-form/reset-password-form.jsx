import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PasswordInput, PasswordConfirmInput } from './password-input';

import { resetPassword } from '../../store/user-reducer';

import './reset-password-form.scss';

export const schema = yup.object().shape({
  password: yup
    .string()
    .required('Поле не может быть пустым')
    .min(8, 'не менее 8 символов,')
    // .matches(/^[A-Za-zА-Яа-я0-9]\w{8,}$/, 'не менее 8 символов')
    .matches(/^.*((?=.*[А-ЯA-Z]){1}).*$/, 'заглавной буквой')
    .matches(/^.*((?=.*[0-9]){1}).*$/, 'цифрой'),
  passwordConfirmation: yup
    .string()
    .required('Поле не может быть пустым')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const ResetPasswordForm = ({ code }) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [checkConfirmOnBlure,setCheckConfirmOnBlure]=useState(false);
  const [isFormNotValid,setIsFormNotValid]=useState(false)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    touched,
    clearErrors,
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
      code,
    },
    criteriaMode: 'all',
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const watchNewPass = watch('password', '');
  const watchConfirmPass = watch('passwordConfirmation', '');

  const onSubmit = (data) => {   
    if(errors?.passwordConfirmation?.type){
     setIsFormNotValid(true)
    }else{
     dispatch(resetPassword(data));
    }
  
  };
  console.log('====================================');
  console.log(isFormNotValid);
  console.log('====================================');

  const checkIsFormValid=(p)=>{
     setIsFormNotValid(p)
  }

  useEffect(() => {
    if (watchNewPass.length > 0 && watchConfirmPass.length > 0 && isFormNotValid) {
      setIsBtnDisabled(true);
      //   setError('passwordConfirmation', { type: 'oneOf' });
    } else {
      setIsBtnDisabled(false);
      //  clearErrors('passwordConfirmation');
    }
  }, [watchConfirmPass, watchNewPass, isFormNotValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='reset-pass-form' data-test-id='reset-password-form'>
      <PasswordInput
        label='password'
        register={register}
        placeholder=' '
        labelValue='Новый пароль'
        validateErrors={errors?.password}
        clearErrors={clearErrors}
        watchPass={watchNewPass}
      />
      <PasswordConfirmInput
        label='passwordConfirmation'
        register={register}
        placeholder=' '
        labelValue='Повторите пароль'
        validateErrors={errors?.passwordConfirmation}
        clearErrors={clearErrors}
        watchPass={watchConfirmPass}
        setCheckConfirmOnBlure={setCheckConfirmOnBlure}
        checkIsFormValid={checkIsFormValid}
      />
      <button type='submit' disabled={isBtnDisabled} className='submit-form-button'>
        сохранить изменения
      </button>
      <div className='reset-password-hint-block'>После сохранения войдите в библиотеку, используя новый пароль</div>
    </form>
  );
};
