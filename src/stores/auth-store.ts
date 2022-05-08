import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import { api, getMe, loginUser, registerUser } from '../api'
import { Me } from '../api/api'
import {
  LoginUserResponsePromise,
  RegisterUserResponsePromise,
  StatusCodes,
} from '../api/api-utility-types'
import { LoadingState } from './entities/loading-state'

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
  meLoadingState = new LoadingState({ handledErrors: [] })
  loadMe(): void {
    this.meLoadingState.setStatus('loading')
    api.setSecurityData(this.token)
    getMe({
      success: (data) => {
        this.setMe(data)

        this.meLoadingState.setCode(200)
        this.meLoadingState.setStatus('success')
      },
    })
  }
  setMe(me: Me | null): void {
    this.me = me
  }

  //! сейчас разделяем register state и login state
  registerLoadingState = new LoadingState({
    handledErrors: [StatusCodes.longRegisterName, StatusCodes.sameRegisterName],
  })
  registerUser(name: string, password: string): RegisterUserResponsePromise {
    this.registerLoadingState.setStatus('loading')

    return registerUser(
      { name, password },
      {
        success: (data) => {
          this.setToken(data.token)

          this.registerLoadingState.setCode(200)
          this.registerLoadingState.setStatus('success')
        },
        error: (error) => {
          this.registerLoadingState.setCode(error.status)
          this.registerLoadingState.setStatus('error')
        },
      }
    )
  }

  loginLoadingState = new LoadingState({
    handledErrors: [StatusCodes.wrongLoginName, StatusCodes.wrongPassword],
  })
  loginUser(name: string, password: string): LoginUserResponsePromise {
    this.loginLoadingState.setStatus('loading')

    return loginUser(
      { name, password },
      {
        success: (data) => {
          this.setToken(data.token)

          this.loginLoadingState.setCode(200)
          this.loginLoadingState.setStatus('success')
        },
        error: (error) => {
          this.loginLoadingState.setCode(error.status)
          this.loginLoadingState.setStatus('error')
        },
      }
    )
  }

  logout(): void {
    this.setToken(null)
    this.setMe(null)
  }
}
