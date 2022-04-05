interface InputState {
  isOnHover: boolean
  isOnFocus: boolean
  isEmpty: boolean
}
export const getCursorState = (props: InputState): string | false => {
  return props.isOnHover && !props.isOnFocus && !props.isEmpty && 'pointer'
}

export const getInputBoxShadow = (props: InputState): string | false => {
  return (
    (props.isEmpty || props.isOnHover || props.isOnFocus) && '0px 0px 11px 0px rgba(34, 60, 80, 0.4)'
  )
}

interface getInputBGCProps extends InputState {
  color: string
}
export const getInputBGC = (props: getInputBGCProps): string | false => {
  return props.isEmpty
    ? '#ffffff'
    : props.isOnFocus
    ? '#ffffff'
    : props.isOnHover
    ? '#eeeeee'
    : props.color
}
