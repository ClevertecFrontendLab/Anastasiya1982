import { useState } from 'react';
import { Input } from '../input-in-form/input-in-form';

import './register-form.scss';

const USER_NAME_ERROR_MESSAGE = `Используйте для логина латинский алфавит и цифры`;
const PASSWORD_ERROR_MESSAGE='Пароль не менее 8 символов, с заглавной буквой и цифрой'

export const AccountForm = ({ username, password, register, errorName, errorPassword })=> {
    const[isValidOnBlur,setIsValidOnBlur]=useState(false);
   
const checkIfUsernameInputBlur=()=>{
    if(errorName?.message){
        setIsValidOnBlur(true)
    }
    else{
        setIsValidOnBlur(false)
     }
}
const checkIfPasswordInputBlur = () => {
  if (errorPassword?.message) {
    setIsValidOnBlur(true);
  } else {
    setIsValidOnBlur(false);
  }
};
  return (
    <div className='input-container'>
      <Input
        label={username}
        placeholder='Придумайте логин для входа'
        register={register}
        errors={errorName}
        onBlur={checkIfUsernameInputBlur}
        errorMessage={USER_NAME_ERROR_MESSAGE}
        isValidOnBlur={isValidOnBlur}
        onFocus={() => setIsValidOnBlur(false)}
      />

      <Input
        label={password}
        register={register}
        placeholder='Пароль'
        type='password'
        errors={errorPassword}
        errorMessage={PASSWORD_ERROR_MESSAGE}
        onBlur={checkIfPasswordInputBlur}
        isValidOnBlur={isValidOnBlur}
        onFocus={() => setIsValidOnBlur(false)}
      />
    </div>
  );
}

