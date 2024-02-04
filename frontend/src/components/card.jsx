import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onDeletePopup, onSelectDeleteCard }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__element-item-group ${isLiked && 'elements__element-like-active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeletePopup();
    onSelectDeleteCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="elements__element-card">
      <div className="elements__element-group">
        <img alt={`Фотография: ${card.name}`} className="elements__element-img" src={card.link} onClick={handleClick} />
        {/* <button className="elements__element-delete" onClick={handleDeleteClick} type="button" /> */}
        {isOwn && <button className="elements__element-delete" onClick={handleDeleteClick} />}
      </div>

      <div className="elements__element-item">
        <h2 className="elements__element-item-text">{card.name}</h2>
        <div className="elements__element-container-like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
          <p className="elements__element-like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};