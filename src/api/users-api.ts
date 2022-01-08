import axios from 'axios'

interface RegistrationResponse {
  data: {
    token: string
    user: {
      name: string
    }
  }
}

export const UsersApi = {
  registerUser: (name: string, password: string) => {
    return axios
      .post<RegistrationResponse>('http://localhost:4400/register', {
        name,
        password,
      })
      .then((res) => {
        return res.data
      })
  },
}
