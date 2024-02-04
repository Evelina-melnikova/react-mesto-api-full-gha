export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(res) {
  return fetch(res)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((errorData) => {
          const errorMessage = errorData.message || 'Request failed';
          const errorWithStatus = new Error(errorMessage);
          errorWithStatus.status = res.status;
          throw errorWithStatus;
        });
      }
    })
    
}


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,password})
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
    body: JSON.stringify({email, password})
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