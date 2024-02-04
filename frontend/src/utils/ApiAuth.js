export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(response) {
  return fetch(response)
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
  return fetch(`${BASE_URL}/signup`, {
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
  .then(getReq)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
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
  .then(getReq)
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