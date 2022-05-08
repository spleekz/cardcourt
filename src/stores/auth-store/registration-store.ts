import { makeAutoObservable } from 'mobx'
import { registerUser } from '../../api'
import { RegisterUserResponsePromise, StatusCodes } from '../../api/api-utility-types'
import { LoadingState } from '../entities/loading-state'
import { AuthStore } from './auth-store'

interface RegistrationStoreConfig {
  authStore: AuthStore
}

export class RegistrationStore {
  authStore: AuthStore

  constructor(config: RegistrationStoreConfig) {
    this.authStore = config.authStore

    makeAutoObservable(this)
  }

  loadingState = new LoadingState({
    handledErrors: [StatusCodes.longRegisterName, StatusCodes.sameRegisterName],
  })
  registerUser(name: string, password: string): RegisterUserResponsePromise {
    this.loadingState.setStatus('loading')

    return registerUser(
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
