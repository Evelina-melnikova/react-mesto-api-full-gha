export const BASE_URL = 'https://api.mesto.evelina.nomoredomainsmonster.ru';

export const getReq= (url, options) => {
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
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const authorize = (password, email) => {
  return getReq(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
};

export const getContent = (token) => {
  return getReq(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  })
};