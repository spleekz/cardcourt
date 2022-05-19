import { UseFormReturn } from 'react-hook-form'

export interface LoginFormValues {
  name: string
  password: string
}

type FormMethods = UseFormReturn<LoginFormValues>

export interface PropsForFormFields {
  formMethods: FormMethods
}
