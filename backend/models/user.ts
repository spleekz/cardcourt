import { createSchema, Type, typedModel } from 'ts-mongoose'

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  password: Type.string({ required: true }),
})

export const User = typedModel('User',UserSchema)