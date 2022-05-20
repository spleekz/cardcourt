import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { api, getMe } from 'api'
import { Me } from 'api/api'
import { StatusCodes } from 'api/api-utility-types'

import { LoadingState } from 'stores/entities/loading-state'

import { LoginStore } from './login-store'
import { RegistrationStore } from './registration-store'

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
  meLoadingState = new LoadingState({ handledErrors: [], initialStatus: 'loading' })
  loadMe(): void {
    this.meLoadingState.setCode(null)

    api.setSecurityData(this.token)
    getMe({
      success: (data) => {
        this.setMe(data)

        this.meLoadingState.setCode(StatusCodes.ok)
      },
    })
  }
  setMe(me: Me | null): void {
    this.me = me
  }

  createRegistrationStoreWithLoadingState(): RegistrationStore {
    return new RegistrationStore({ authStore: this })
  }
  createLoginStoreWithLoadingState(): LoginStore {
    return new LoginStore({ authStore: this })
  }

  logout(): void {
    this.setToken(null)
    this.setMe(null)
  }
}
