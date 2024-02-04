import apiConfig from './constants.js';

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getRequest(options, url) {
        return fetch(options, url)
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            });
    }

    getAllCards() {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/cards`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    };

    createCard(data) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/cards`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
    }

    deleteCard(data) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/cards/${data}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }

    getNewAvatar(item) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: item['avatar'],
            })
        })
    }

    setlikeApi(id, isLiked) {
        const token = localStorage.getItem('token');
        return isLiked
            ? this._getRequest(`${this._url}/cards/${id}/likes`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            : this._getRequest(`${this._url}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
    }


    setUserInfo(data) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        });
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }
}
const api = new Api(apiConfig);

export default api;