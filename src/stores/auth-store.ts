import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { Me } from '../api/api'

export interface IAuthStore {
  token: string | null
  me: Me | null
  setToken(token: string | null): void
  registerUser(name: string, password: string): Promise<void>
  loginUser(name: string, password: string): Promise<void>
  loadMe(): void
  setMe(me: Me | null): void
  logout(): void
}

export class AuthStore implements IAuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, { name: 'AuthStore', properties: ['token'], storage: window.localStorage })
  }

  token: string | null = null
  me: Me | null = null

  setMe(me: Me | null): void {
    this.me = me
  }
  setToken(token: string | null): void {
    this.token = token
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

  loadMe(): void {
    api.setSecurityData(this.token)
    api.me.getMe().then((res) => {
      if (res) {
        this.setMe(res.data)
      }
    })
  }

  logout(): void {
    this.setToken(null)
    this.setMe(null)
  }
}
