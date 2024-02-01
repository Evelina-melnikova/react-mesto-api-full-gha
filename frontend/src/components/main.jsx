/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './card';


export default function Main({ currentUser, cards, onEditProfile,
  onAddPlace, onEditAvatar, onDeletePopup,
  onSelectDeleteCard, onCardClick, onCardLike }) {

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-overlay">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-name-and-button">
            <h1 className="profile__info-name" aria-label="Имя пользователя">
              {currentUser.name}
            </h1>
            <button
              className="profile__info-edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__info-popup-job">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Карточки мест России">
        <ul className="elements__element">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onDeletePopup}
              onSelectDeleteCard={onSelectDeleteCard}
              onDeletePopup={onDeletePopup}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}








