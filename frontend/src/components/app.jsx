/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken } from '../utils/token';
import '../index.css';
import Header from './header';
import Main from './main';
import Footer from './footer';
import ImagePopup from './image-popup';
import AddPlacePopup from './add-place-popup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/Cards.Context';
import EditProfilePopup from './edit-profile-popup';
import EditAvatarPopup from './edit-avatar-popup';
import DeletePopup from './delete-popup';
import * as ApiAuth from '../utils/ApiAuth';
import ProtectedRoute from './protected-route';
import Login from './login';
import InfoToolTip from './info-tool-tip';
import Register from './register';


export default function App() {
  // const navigateRef = useRef(navigate);

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddCardsPopupOpen, setAddCardsPopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [isSucsessed, setIsSucsessed] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [error, setError] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopup] = React.useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    setUserEmail('');
    setIsLoggedIn(false);
  };

  const onLogin = (password, email) => {
      return ApiAuth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setError(err);
        setIsToolTipOpen(true);
        setIsSucsessed(false);
      });
  }

  const onRegister = (email, password) => {
    return ApiAuth.register(email, password)
      .then(() => {
        setIsSucsessed(true);
        setIsToolTipOpen(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsSucsessed(false);
        setIsToolTipOpen(true);
      });

  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddCardsClick() {
    setAddCardsPopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeletePopupClick() {
    setDeletePopup(true);
  }

  function closeAllPopups() {
    handleEditProfileClick(false);
    handleAddCardsClick(false);
    handleEditAvatarClick(false);
    setSelectedCard({});
    isToolTipOpen(false);
  }

  // const auth = useCallback(async (jwt) => {
  //   try {
  //     const res = await ApiAuth.getContent(jwt);
  //     if (res) {
  //       setIsLoggedIn(true);
  //       setUserEmail(res.data.email);
  //       navigate('/');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setIsLoggedIn, setUserEmail, navigate]);

  function showLoader() {
    setIsLoading(true);
  }

  function removeLoader() {
    setIsLoading(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    showLoader()

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleUpdateAvatar(data) {
    showLoader()

    api.getNewAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleUpdateUser(data) {
    showLoader();

    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function handleAddCard(data) {
    showLoader();

    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        removeLoader()
      });
  }

  // useEffect(() => {
  //   api.getUserInfo()
  //     .then((data) => {
  //       setCurrentUser(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   api.getAllCards()
  //     .then(data => {
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);



  // useEffect(() => {
  //   const jwt = getToken();

  //   if (jwt) {
  //     auth(jwt);
  //   }
  // }, [auth]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      ApiAuth.getContent(jwt)
        .then((res) => {
          navigate("/");
          setUserEmail(res.email);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .getUserInfoApi()
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true)
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .getAllCards()
        .then((data) => {
          setCards(data);
          setIsLoggedIn(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isloggedIn, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>

        <div className="page">
          <Header email={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  loggedIn={isloggedIn}
                  element={Main}
                  cards={cards}
                  currentUser={currentUser}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onSelectDeleteCard={setSelectedDeleteCard}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onAddPlace={handleAddCardsClick}
                  onDeletePopup={handleDeletePopupClick}
                />} />
            <Route path='/sign-up'
              element={<Register
                onRegister={onRegister}
                isSucsessed={isSucsessed}
                onClose={closeAllPopups}
                isOpen={isToolTipOpen}
              />} />
            <Route path='/sign-in'
              element={<Login
                onLogin={onLogin}
                onClose={closeAllPopups}
                isOpen={isToolTipOpen}
                isloggedIn={isloggedIn}
              />} />

          </Routes>
          {isloggedIn && <Footer />}

        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddCardsPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedDeleteCard}
          onLoading={isLoading}
        />
        <InfoToolTip
          isSucsessed={isSucsessed}
          isOpen={isToolTipOpen}
          onClose={closeAllPopups}
          error={error}
        />
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  )
}