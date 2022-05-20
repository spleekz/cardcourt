import React from 'react'

import { AuthFormInput } from '../shared-components'
import { PropsForFormFields } from './types'

export const LoginInput: React.FC<PropsForFormFields> = ({ formMethods }) => {
  const { register, getValues, setValue } = formMethods

  const onLoginInputBlur = (): void => {
    const { name } = getValues()
    setValue('name', name.trim())
  }

  return (
    <AuthFormInput
      {...register('name', { required: true })}
      placeholder='Логин'
      maxLength={14}
      onBlur={onLoginInputBlur}
    />
  )
}
