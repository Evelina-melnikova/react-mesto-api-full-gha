// export const popupOpenEditButton = document.querySelector('.profile__info-edit-button');
// export const formElProf = document.querySelector('.popup__form_profile-edit');
// export const nameInput = document.querySelector('.popup__input_type_name');
// export const jobInput = document.querySelector('.popup__input_type_job');
// export const template = document.querySelector('.templateEl');
// export const popupOpenAddButton = document.querySelector('.profile__add-button');
// export const formElAdd = document.querySelector('.popup__form_cards-add');
// export const formElAvatar = document.querySelector('.popup__form_update-avatar');
// export const avatarImage = document.querySelector('.profile__avatar');



// export const configInfo = {
//     profileNameSelector: '.profile__info-name',
//     profileJobSelector: '.profile__info-popup-job',
//     avatarSelector: '.profile__avatar'
// }


export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button-invalid',
    inputErrorClass: 'popup__input_type_error'
};


 const apiConfig = {
    url: 'https://api.mesto.evelina.nomoredomainsmonster.ru',
   //  headers: {
   //     authorization: '2c619271-7a2d-4266-95fe-47db284f8454',
   //     "Content-Type": "application/json",
   //   }
   }

export default apiConfig;