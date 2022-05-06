export type AnyObject = Record<string, any>

export type EmptyFunction = (...args: Array<any>) => void

export type Rename<Type, Key extends keyof Type, NewKeyName extends PropertyKey> = Omit<Type, Key> & {
  [P in NewKeyName]: Type[Key]
}

export type NotUndefinded<Type> = Type extends undefined ? never : Type

export type RequiredBy<Type, Key extends keyof Type> = Omit<Type, Key> &
  Required<{
    [P in Key]: NotUndefinded<Type[Key]>
  }>
