import React from 'react'

import { AuthFormInput } from '../shared-components'
import { PropsForFormFields } from './types'

export const PasswordInput: React.FC<PropsForFormFields> = ({ formMethods }) => {
  const { register } = formMethods

  return (
    <AuthFormInput
      {...register('password', { required: true })}
      placeholder='Пароль'
      type='password'
    />
  )
}
