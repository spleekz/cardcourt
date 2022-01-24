import { Api } from './api'

export const api = new Api({
  baseUrl: 'http://localhost:4400',
  baseApiParams: {
    secure: true,
  },
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
})
