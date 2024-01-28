import React from "react";
import PopupWithForm from "./popup-with-form";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {

  const avatarLink = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarLink.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
    >
        <input
          name="avatar"
          placeholder="Ссылка на картинку"
          type="url"
          id="avatar"
          className="popup__input popup__input_type_link-avatar"
          required=""
          ref={avatarLink}
        />
        <span
          className="popup__error"
          id="avatar-errorr"
        />
    </PopupWithForm>
  )
}

