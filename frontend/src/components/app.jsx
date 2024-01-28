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




  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddCardsClick = () => {
    setAddCardsPopup(true);
  };

  const handleDeletePopupClick = () => {
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

  const auth = useCallback(async (jwt) => {
    try {
      const res = await ApiAuth.getContent(jwt);
      if (res) {
        setIsLoggedIn(true);
        setUserEmail(res.data.email);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }, [setIsLoggedIn, setUserEmail, navigate]);

  const onRegister = (password, email) => {
    return ApiAuth.register(password, email).then((res) => {
      setIsSucsessed(true);
      setIsToolTipOpen(true);
      return res;
    }).catch((err) => {
      setIsSucsessed(false);
      setIsToolTipOpen(true);
      setError(err);
    })
  }

  const onSignOut = () => {
    removeToken();
    setUserEmail('');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const onLogin = (password, email) => {
    return ApiAuth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          navigate('/');
          return data;
        } else {
          return;
        }
      }).catch((err) => {
        setIsSucsessed(false);
        setIsToolTipOpen(true);
        setError(err);
      })
  }


  function showLoader() {
    setIsLoading(true);
  }

  function removeLoader() {
    setIsLoading(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setlikeApi(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
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
  }, []);



  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      auth(jwt);
    }
  }, [auth]);

  // useEffect(() => {
  //   const initialRoute = '/';
  //   navigateRef.current(initialRoute);
  // }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>

        <div className="page">
          <Header email={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route path='/'
                element={<ProtectedRoute
                loggedIn={isloggedIn}
                element={Main}
                cards={cards}
                currentUser={currentUser}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onSelectDeleteCard={setSelectedDeleteCard}
                onCardClick={setSelectedCard}
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