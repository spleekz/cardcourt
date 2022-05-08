import { makeAutoObservable } from 'mobx'
import { loginUser } from '../../api'
import { LoginUserResponsePromise, StatusCodes } from '../../api/api-utility-types'
import { LoadingState } from '../entities/loading-state'
import { AuthStore } from './auth-store'

interface LoginStoreConfig {
  authStore: AuthStore
}

export class LoginStore {
  authStore: AuthStore

  constructor(config: LoginStoreConfig) {
    this.authStore = config.authStore

    makeAutoObservable(this)
  }

  loadingState = new LoadingState({
    handledErrors: [StatusCodes.wrongLoginName, StatusCodes.wrongPassword],
  })
  loginUser(name: string, password: string): LoginUserResponsePromise {
    this.loadingState.setStatus('loading')

    return loginUser(
      { name, password },
      {
        success: (data) => {
          this.authStore.setToken(data.token)

          this.loadingState.setCode(200)
          this.loadingState.setStatus('success')
        },
        error: (error) => {
          this.loadingState.setCode(error.status)
          this.loadingState.setStatus('error')
        },
      }
    )
  }
}
