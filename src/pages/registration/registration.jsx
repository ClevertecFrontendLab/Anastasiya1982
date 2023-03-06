import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/loader/loader';
import { RegistrationForm } from '../../components/register-form/register-form';
import { setUserRegisterDataError } from '../../store/user-reducer'; 


import './registration.scss';

export const ModalWithRegisterForm = () => {
  const steps = useSelector((store) => store.registration.steps);
  const currentStepIndex = useSelector((store) => store.registration.currentStepIndex);
  const user = useSelector((store) => store.userData.userData);
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);

  return (
    <div className='register-form-wrapper'>
      <h4 className='form-title'>Регистрация</h4>
      <div className='step-number-block'> {steps[currentStepIndex]} шаг из 3</div>
      <div className='form-container'>
        <RegistrationForm />
      </div>
      <div className='enter-block'>
        <span className='enter-block-title'>Есть учётная запись?</span>
        <Link  to ='/auth' className='enter-block-button'>
          Войти
        </Link>
      </div>
    </div>
  );
};

export const ModalSuccessRegistrationForm = () =>  {
    const navigate=useNavigate();
    return(
   <div className='register-form-wrapper'>
       <h4 className='form-title'>Регистрация успешна</h4>
       <div className='form-content'>
         Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
       </div>
       <div className='enter-block'>        
         <button type='button' className='enter-block-button' onClick={()=>navigate('/auth')}>
           Вход
         </button>
       </div>
     </div>
    )
}

  
   

   export const ModalErrorRegistrationForm = () => {
    const dispatch=useDispatch()
     const error = useSelector((store) => store.userData.userDataError);
     return (
       <div className='register-form-wrapper'>
         <h4 className='form-title'>Данные не сохранились</h4>
         <div className='form-content'>
           {error.status === 400
             ? 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
             : 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'}
         </div>
         <div className='enter-block'>
           {error.status === 400 && (
             <button
               type='button'
               onClick={() => dispatch(setUserRegisterDataError(null))}
               className='enter-block-button'
             >
               Назад к регистрации
             </button>
           )}
           {error.status === 500 && (
             <button
               type='button'
               onClick={() => dispatch(setUserRegisterDataError(null))}
               className='enter-block-button'
             >
               Повторить
             </button>
           )}
         </div>
       </div>
     );
   }
   
     


export const RegistrationPage = () => {
  const user = useSelector((store) => store.userData.userData);
  const isUserDataLoading = useSelector((store) => store.userData.isUserDataLoading);
  const error = useSelector((store) => store.userData.userDataError);
const isAuth = localStorage.getItem('isAuth');
const navigate=useNavigate();

   useEffect(() => {
     if (isAuth) {
       navigate('/books/all');
     } 
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAuth]);

  return (
    <div className='register-page'>
      {isUserDataLoading && <Loader />}
      <h3 className='register-page-header'>Cleverland</h3>
      {!user && !error && <ModalWithRegisterForm />}
      {user && !error && < ModalSuccessRegistrationForm/>}
      {!user && error && <ModalErrorRegistrationForm/>}
    </div>
  );
};

