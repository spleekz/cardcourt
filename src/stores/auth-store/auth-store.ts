import { makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import { api, getMe } from '../../api'
import { LoadingState } from '../entities/loading-state'
import { Me } from '../../api/api'
import { RegistrationStore } from './registration-store'
import { LoginStore } from './login-store'

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
