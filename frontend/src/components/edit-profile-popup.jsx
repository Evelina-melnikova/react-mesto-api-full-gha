import React from "react";
import PopupWithForm from "./popup-with-form";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameValue, setNameValue] = React.useState('');
  const [descriptionValue, setDescriptionValue] = React.useState('');

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: nameValue,
      about: descriptionValue,
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      setNameValue(currentUser.name);
      setDescriptionValue(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='popup__form'
      title='Редактировать профиль'
      button='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
    >
        <input
          name="name"
          minLength={2}
          maxLength={40}
          type="text"
          id="name"
          className="popup__input popup__input_type_name"
          required
          value={nameValue ?? ''}
          onChange={handleNameChange}
        />
        <span
          className="popup__error"
          id="name-error"
        />
        <input
          name="about"
          minLength={2}
          maxLength={200}
          type="text"
          id="about"
          className="popup__input popup__input_type_job"
          required=""
          value={descriptionValue ?? ''}
          onChange={handleDescriptionChange}
        />
        <span
            className="popup__error"
            id="about-error"
        />
    </PopupWithForm>
  )
}

