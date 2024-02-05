export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const authorize = (email, password) => {
  const emailStr = typeof email === 'object' && email.value ? email.value : email;
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email: emailStr, password: password})
  })
  .then(getReq)
  .then(data => {
    // Проверка наличия токена в ответе и его сохранение в localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data; // Возвращаем данные для дальнейшей обработки
  });
}

export const register = (email, password) => {
  const emailStr = typeof email === 'object' && email.value ? email.value : email;
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email: emailStr, password: password})
  })
  .then(getReq)
  .then(data => {
    // Проверка наличия токена в ответе и его сохранение в localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data; // Возвращаем данные для дальнейшей обработки
  });
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
  })
  .then(getReq)
}