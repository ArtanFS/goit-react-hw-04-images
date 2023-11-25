import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ modalData, closeModal }) => {
  const { url, alt } = modalData;

  useEffect(() => {
    const hendleKeyboardClose = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', hendleKeyboardClose);
    return () => window.removeEventListener('keydown', hendleKeyboardClose);
  }, [closeModal]);

  const closeOnClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={closeOnClickBackdrop}>
      <div className={css.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
