import api from '../config'
import TokenService from './token-service'

const AuthApiService = {
  postUser(user) {
    return fetch(`${api.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postLogin({ username, password }) {
    return fetch(`${api.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  refreshToken() {
    return fetch(`${api.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default AuthApiService
