export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru/';

export const getReq = (url, options) => {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      throw new Error('Что-то пошло не так')
    })
}


export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(getReq)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
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