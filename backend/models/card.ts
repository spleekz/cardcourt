import { createSchema, Type, typedModel } from 'ts-mongoose'

const CardSchema = createSchema({
  title: Type.string({ required: true }),
  author: Type.string({ required: true }),
  words: Type.array({ required: true }).of({
    en: Type.string({ required: true }),
    ru: Type.string({ required: true }),
  }),
  ui: {
    headColor: Type.string({ required: true }),
    bodyColor: Type.string({ required: true }),
  },
})

export const Card = typedModel('Card', CardSchema)
