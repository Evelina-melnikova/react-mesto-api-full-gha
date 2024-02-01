export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function  getReq(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}


export const register = (password, email) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
    .then(getReq)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
    .then(getReq)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(getReq)
}