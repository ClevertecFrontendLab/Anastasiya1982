import ReactDOM from 'react-dom';
import './modal-popup.scss';

export const ModalPopup = ({ children, isPopupOpen, closeModal }) => {
  if (!isPopupOpen) return null;

  return ReactDOM.createPortal(
    <div className='popup-container' onClick={closeModal} role='presentation'>
      {children}
    </div>,
    document.getElementById('portal')
  );
};
