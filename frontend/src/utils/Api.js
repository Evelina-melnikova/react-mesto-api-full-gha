import apiConfig from './constants.js';

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getRequest(url, options) {
        return fetch(url, options)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Что-то пошло не так')
            })
    }

    getAllCards() {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/cards`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    };

    createCard(data) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/cards`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
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
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }

    getNewAvatar(item) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
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
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            : this._getRequest(`${this._url}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
    }

    // removeLikeApi(data) {
    //     return this._getRequest(`${this._url}/cards/${data}/likes`,
    //         {
    //             method: 'DELETE',
    //             headers: this._headers

    //         })
    // }

    setUserInfo(data) {
        const token = localStorage.getItem('token');
        return this._getRequest(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
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
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }
}
const api = new Api(apiConfig);

export default api;