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
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddCardsPopupOpen, setAddCardsPopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setDeletePopup] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [isSucsessed, setIsSucsessed] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState({});

  const onSignOut = () => {
    removeToken();
    navigate('/login');
    setUserEmail('');
    setIsLoggedIn(false);
  };

  const onLogin = (password, email) => {
    return ApiAuth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setIsLoggedIn(true);
          navigate('/');
          return res;
        } else {
          return;
        }
      }).catch((err) => {
        setIsSucsessed(false);
        setIsToolTipOpen(true);
        setError(err);
      })
  }

  const onRegister = (email, password) => {
    return ApiAuth.register(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        setIsSucsessed(true);
        setIsToolTipOpen(true);
        navigate('/signin');
      }
    })
    .catch((err) => {
      setIsSucsessed(false);
        setIsToolTipOpen(true);
        setError(err);
    });
};

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

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCard({});
    setSelectedDeleteCard({});
    setAddCardsPopup(false);
    setDeletePopup(false);
    setIsToolTipOpen(false);
  }

  const auth = useCallback( async () => {
    try {
      const res = await ApiAuth.getContent();
      if (res.token) {
        setIsLoggedIn(true);
        setUserEmail(res.data.email);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }, [setIsLoggedIn, setUserEmail, navigate]);

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

  useEffect(() => {
    if (isloggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
      api.getAllCards()
        .then(data => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isloggedIn]);

  useEffect(() => {
    const initialRoute = '/';
    navigateRef.current(initialRoute);
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      auth(jwt);
    }
  }, [auth]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      ApiAuth.getContent(jwt)
        .then((res) => {
          localStorage.setItem("token", res.token);
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