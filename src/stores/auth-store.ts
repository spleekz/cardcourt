import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { Me } from '../api/api'

export class AuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, { name: 'authStore', properties: ['token'], storage: window.localStorage })
  }

  token: string | null = null
  setToken(token: string | null): void {
    this.token = token
  }

  me: Me | null = null

  isLoadingMe = false
  setIsLoadingMe(value: boolean): void {
    this.isLoadingMe = value
  }

  loadMe(): void {
    this.setIsLoadingMe(true)
    api.setSecurityData(this.token)
    api.me.getMe().then((res) => {
      if (res.ok) {
        this.setMe(res.data)
        this.setIsLoadingMe(false)
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
