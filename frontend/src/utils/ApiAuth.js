export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(url, options) {
  return fetch(url, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((errorData) => {
        const errorMessage = errorData.message || 'Request failed';
        const errorWithStatus = new Error(errorMessage);
        errorWithStatus.status = response.status;
        throw errorWithStatus;
      });
    }
  })
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