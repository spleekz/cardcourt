import { makeAutoObservable } from 'mobx'
import { isUnknownError } from '../../utils/errors'

interface FlowStateConfig {
  handledErrors: Array<number>
}

type LoadingStatus = 'error' | 'loading' | 'success'

export class LoadingState {
  handledErrors: Array<number> = []

  constructor(config: FlowStateConfig) {
    const { handledErrors } = config
    this.handledErrors = handledErrors

    makeAutoObservable(this)
  }

  status: LoadingStatus = 'loading'
  setStatus(status: LoadingStatus): void {
    this.status = status
  }

  code: number | null = null
  setCode(code: number | null): void {
    this.code = code
  }

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
    return this.code !== null && this.code === 404
  }
  get isUnknownError(): boolean {
    return this.code !== null && isUnknownError(this.code, this.handledErrors)
  }
}
