import classNames from 'classnames';
import IconWarning from '../../assets/Icon-warning-loading.png';
import IconSuccess from '../../assets/Icon-success.png';
import { ReactComponent as CloseIcon } from '../../assets/close-button-icon.svg';

import './toast-modal.scss';

export const messageType = {
  success: 'success',
  error: 'error',
};

export const ToastModal = ({ type, handleModal }) => {
  const notificationContent =
    type === messageType.success
      ? 'Изменения успешно сохранены!'
      : type === messageType.error
      ? 'Что-то пошло не так. Обновите страницу через некоторое время'
      : '';

  const toastClasses = classNames('modal', {
    success: type === messageType.success,
    error: type === messageType.error,
  });

  return (
    <div className='popup-container' onClick={(e) => e.stopPropagation()} role='presentation' data-test-id='error'>
      <div className={toastClasses} role='presentation' data-test-id='error'>
        <div className='modal-content'>
          {type === messageType.error && <img className='icon-warning' src={IconWarning} alt='icon-warning' />}
          {type === messageType.success && <img className='icon-warning' src={IconSuccess} alt='icon-warning' />}
          <p>{notificationContent}</p>
        </div>

        <button className='close-mobile-button' type='button' onClick={handleModal}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
