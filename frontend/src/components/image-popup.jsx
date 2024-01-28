import React from "react";

export default function ImagePopup ({ card, onClose }) {
  return (
    <div className={`popup popup_photo ${card.link ? 'popup_opened' : ''}`}>
      <figure className="popup__container popup__container_photo">
        <button
          className="popup__close-button popup__close-button_photo"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          src={ card.link }
          alt={ card.name }
          className="popup__open-img"
        />
        <p className="popup__photo-text">
          { card.name }
        </p>
      </figure>
    </div>
  );
}

 