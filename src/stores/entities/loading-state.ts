import { makeAutoObservable } from 'mobx'
import { StatusCodes } from '../../api/api-utility-types'
import { notNull } from '../../utils/basic'
import { isUnknownError } from '../../utils/errors'

type LoadingStatus = 'initial' | 'loading' | 'success' | 'error'

interface FlowStateConfig {
  initialStatus?: LoadingStatus
  handledErrors: Array<StatusCodes>
}

export class LoadingState {
  handledErrors: Array<StatusCodes> = []

  constructor(config: FlowStateConfig) {
    const { initialStatus = 'initial', handledErrors } = config

    this.setStatus(initialStatus)
    this.handledErrors = handledErrors

    makeAutoObservable(this)
  }

  status: LoadingStatus = 'initial'
  setStatus(status: LoadingStatus): void {
    this.status = status
  }

  code: number | null = null
  setCode(code: number | null): void {
    this.code = code
  }

  //Основные статусы
  get isLoaded(): boolean {
    return this.status === 'success'
  }
  get isLoading(): boolean {
    return this.status === 'loading'
  }
  get isLoadingFailed(): boolean {
    return this.status === 'error'
  }
  get notFound(): boolean {
    return this.code === StatusCodes.notFound
  }

  //Доп.статусы
  get longRegisterName(): boolean {
    return this.code === StatusCodes.longRegisterName
  }
  get sameRegisterName(): boolean {
    return this.code === StatusCodes.sameRegisterName
  }

  get wrongLoginName(): boolean {
    return this.code === StatusCodes.wrongLoginName
  }
  get wrongPassword(): boolean {
    return this.code === StatusCodes.wrongPassword
  }

  get isUnknownError(): boolean {
    return notNull(this.code) && isUnknownError(this.code, this.handledErrors)
  }
}
