import React from "react";
import PopupWithForm from "./popup-with-form";

export default function AddPlacePopup({ isOpen, onClose, onAddCard, onLoading }) {
  const [ cardsNameValue, setCardsNameValue ] = React.useState('');
  const [ linkValue, setLinkValue ] = React.useState('');

  const handleCardNameChange = (e) => {
    setCardsNameValue(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLinkValue(e.target.value);
  }

  function handleAddCardsSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: cardsNameValue,
      link: linkValue,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setCardsNameValue('');
      setLinkValue('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup__form-add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleAddCardsSubmit}
    >
        <input
          name="title"
          minLength={2}
          maxLength={30}
          placeholder="Название"
          type="text"
          id="title"
          className="popup__input popup__input_type_title"
          required=""
          value={cardsNameValue ?? ''}
          onChange={handleCardNameChange}
        />
        <span
          className="popup__error"
          id="title-error"
        />
        <input
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          id="link"
          className="popup__input popup__input_type_link"
          required=""
          value={linkValue ?? ''}
          onChange={handleLinkChange}
        />
        <span
          className="popup__error"
          id="link-error"
        />
    </PopupWithForm>
  )
}

