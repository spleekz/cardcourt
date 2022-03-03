import { api } from '../api'
import { makeAutoObservable } from 'mobx'
import { PublicUser, PublicUserInfo } from '../../../backend/api/api-types'

export interface IUsersStore {
  user: Partial<PublicUser>
  setPublicUserInfo(publicUserInfo: PublicUserInfo): void
  loadUserPublicInfo(name: string): void

  isCurrentUser: boolean
}

export class UsersStore implements IUsersStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: Partial<PublicUser> = {}
  setPublicUserInfo(publicUserInfo: PublicUserInfo): void {
    this.user.publicUserInfo = publicUserInfo
  }
  loadUserPublicInfo(name: string): void {
    api.userInfo.getUserInfo(name).then((res) => {
      if (res.ok) {
        this.setPublicUserInfo(res.data)
      }
    })
  }

  get isCurrentUser(): boolean {
    return this.user.publicUserInfo !== undefined || this.user.publicUserFeatures !== undefined
  }
}
