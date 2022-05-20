import { makeAutoObservable } from 'mobx'

import { registerUser } from 'api'
import { RegisterUserResponsePromise, StatusCodes } from 'api/api-utility-types'

import { LoadingState } from 'stores/entities/loading-state'

import { AuthStore } from './auth-store'

interface RegistrationStoreConfig {
  authStore: AuthStore
}

export class RegistrationStore {
  authStore: AuthStore

  constructor(config: RegistrationStoreConfig) {
    this.authStore = config.authStore

    makeAutoObservable(this, {}, { autoBind: true })
  }

  loadingState = new LoadingState({
    handledErrors: [StatusCodes.longRegisterName, StatusCodes.sameRegisterName],
  })
  registerUser(name: string, password: string): RegisterUserResponsePromise {
    this.loadingState.setCode(null)

    return registerUser(
      { name, password },
      {
        success: (data) => {
          this.authStore.setToken(data.token)

          this.loadingState.setCode(StatusCodes.ok)
        },
        error: (error) => {
          this.loadingState.setCode(error.status)
        },
      },
    )
  }
}
