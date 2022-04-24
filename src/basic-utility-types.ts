export type EmptyFunction = (...args: Array<any>) => void

export type Rename<Type, Key extends keyof Type, NewKeyName extends PropertyKey> = Omit<Type, Key> & {
  [P in NewKeyName]: Type[Key]
}
