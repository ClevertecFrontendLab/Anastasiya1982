import { useSelector } from 'react-redux';
import { RegistrationForm } from '../../components/register-form/register-form';

import './registration.scss';

export const RegistrationPage = () => {
  const steps = useSelector((store) => store.registration.steps);
  const currentStepIndex = useSelector((store) => store.registration.currentStepIndex);

  return (
    <div className='register-page'>
      <h3 className='register-page-header'>Cleverland</h3>
      <div className='register-form-wrapper'>
        <h4 className='form-title'>Регистрация</h4>
        <div className='step-number-block'> {steps[currentStepIndex]} шаг из 3</div>
        <div className='form-container'>
          <RegistrationForm />
        </div>
        <div className='enter-block'>
          <span className='enter-block-title'>Есть учётная запись?</span>
          <button type='button' className='enter-block-button'>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
