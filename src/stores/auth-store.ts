import { UsersApi } from '../api/users-api'
import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'

export interface IAuthStore {
  token: string | null
  isRedirecting: boolean
  setIsRedirecting(value: boolean): void
  registerUser(name: string, password: string): void
}

export class AuthStore implements IAuthStore {
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'AuthStore', properties: ['token'], storage: window.localStorage })
  }

  token: string | null = null
  isRedirecting = false

  registerUser(name: string, password: string): void {
    UsersApi.registerUser(name, password).then((res) => {
      //eslint-disable-next-line
      //@ts-ignore
      if (res.code === 0) {
        this.setIsRedirecting(true)
        this.token = res.data.token
      }
    })
  }
  setIsRedirecting(value: boolean): void {
    this.isRedirecting = value
  }
}
