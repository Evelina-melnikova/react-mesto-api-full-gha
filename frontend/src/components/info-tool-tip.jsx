import React from "react";
import tickImg from '../images/tickImg.svg';
import errorImg from '../images/errorImg.svg';

function InfoToolTip({ isSucsessed, isOpen, onClose }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container_login`}>
        {isSucsessed && (<>
          <img src={tickImg} alt="галочка" className='popup__image-login' />
          <p className='popup__caption'>Вы успешно{'\n'}зарегистрировались!</p>
        </>)}
        {!isSucsessed && (<>
          <img src={errorImg} alt="крестик" className='popup__image-login' />
          <p className='popup__caption'>
            {'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </>)}
        <button
          className="popup__close-button popup__close-button_login"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoToolTip;

