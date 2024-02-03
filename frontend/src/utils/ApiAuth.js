export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

function getReq(url, options) {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((errorData) => {
          const errMessage = errorData.message || 'Request failed';
          const errStatus = new Error(errMessage);
          errStatus.status = res.status;
          throw errStatus;
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
      email: email,
      password: password
    })
  })
    .then(getReq)
}

export const authorize = (password, email) => {
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
    .then(getReq)
}

export const getContent = (token) => {
  return getReq(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(getReq)
}