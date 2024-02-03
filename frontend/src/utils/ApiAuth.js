export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

export const getRequest= (url, options) => {
  return fetch(url, options)
      .then((res) => {
          if (res.ok) {
              return res.json()
          }

          throw new Error('Что-то пошло не так')
      })
    }


export const register = (password, email) => {
  return getRequest(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const authorize = (password, email) => {
  return getRequest(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const getContent = () => {
  return getRequest(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
};