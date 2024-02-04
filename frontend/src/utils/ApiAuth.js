export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(res) {
    if (res.ok) {
      return res.json();   
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

export const register = (password, email) => {
  return getReq(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
}

export const authorize = (email, password) => {
  return getReq(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
}

export const getContent = (token) => {
  return getReq(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
}