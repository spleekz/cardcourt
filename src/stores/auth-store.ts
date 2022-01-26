import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { Me } from '../api/api'

export interface IAuthStore {
  token: string | null
  setToken(token: string | null): void

  me: Me | null
  loadMe(): void
  setMe(me: Me | null): void

  registerUser(name: string, password: string): Promise<void>
  loginUser(name: string, password: string): Promise<void>
  logout(): void
}

export class AuthStore implements IAuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, { name: 'AuthStore', properties: ['token'], storage: window.localStorage })
  }

  token: string | null = null
  setToken(token: string | null): void {
    this.token = token
  }

  me: Me | null = null
  loadMe(): void {
    api.setSecurityData(this.token)
    api.me.getMe().then((res) => {
      if (res) {
        this.setMe(res.data)
      }
    })
  }
  setMe(me: Me | null): void {
    this.me = me
  }

  registerUser(name: string, password: string): Promise<void> {
    return api.register.registerUser({ name, password }).then((res) => {
      if (res.ok) {
        this.setToken(res.data.token)
      }
    })
  }
  loginUser(name: string, password: string): Promise<void> {
    return api.login.loginUser({ name, password }).then((res) => {
      if (res.ok) {
        this.setToken(res.data.token)
      }
    })
  }
  logout(): void {
    this.setToken(null)
    this.setMe(null)
  }
}
