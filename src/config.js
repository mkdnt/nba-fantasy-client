require('dotenv').config

const api = {
  API_ENDPOINT: 'http://localhost:8000/api',
  API_KEY: process.env.REACT_APP_API_KEY,
  NBA_API_ENDPOINT: 'https://www.balldontlie.io/api/v1/players',
  TOKEN_KEY: 'change-this-secret',
}

export default api