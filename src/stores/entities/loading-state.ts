import { makeAutoObservable } from 'mobx'
import { StatusCodes } from '../../api/api-utility-types'
import { notNull } from '../../utils/basic'
import { isErrorCode, isUnknownError } from '../../utils/server-codes'

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

  get success(): boolean {
    return this.status === 'success'
  }
  get loading(): boolean {
    return this.status === 'loading'
  }
  get error(): boolean {
    return this.status === 'error'
  }

  get notFound(): boolean {
    return this.code === StatusCodes.notFound
  }

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

  get notAuthorOfCard(): boolean {
    return this.code === StatusCodes.notAuthorOfCard
  }

  get unknownError(): boolean {
    return (
      notNull(this.code) && isErrorCode(this.code) && isUnknownError(this.code, this.handledErrors)
    )
  }
}
