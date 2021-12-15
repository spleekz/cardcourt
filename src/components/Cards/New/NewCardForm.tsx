import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useForm, useFieldArray, SubmitHandler, FormProvider } from 'react-hook-form'
import { IWordWithTranslate, ICard } from '../../../stores/CardsStore'
import { CardContainer, CardAuthor, CardWords, CardHeading } from '../Element/CardElement'
import { nanoid } from 'nanoid'
import { useStore } from '../../../stores/RootStore/RootStoreContext'
import { FormWordPair } from './FormWordPair'

const NewCardFormContainer = styled(CardContainer)`
  width: 500px;
  height: 780px;
`
const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const NewCardHeading = styled(CardHeading)`
  padding: 15px 15px 0 15px;
`
const CardNameInput = styled.input`
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
  font-weight: bold;
  font-size: 32px;
`
const NewCardAuthor = styled(CardAuthor)``
const NewCardWordsContainer = styled(CardWords)`
  height: 650px;
  padding: 10px 15px;
  border-radius: 16px;
  overflow-y: auto;
`
const NewCardWords = styled.div``

const AddWordPairButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`
const AddWordPairButton = styled.button`
  width: 50%;
  background-color: pink;
  font-size: 25px;
  font-weight: bold;
  border-radius: 5px;
`

const SubmitButton = styled.button`
  width: 100%;
  background-color: pink;
  font-size: 28px;
  padding: 4px;
  font-weight: bold;
  position: relative;
  z-index: 1000;
`

export const NewCardForm: React.FC = () => {
  const { cardsStore } = useStore()
  const methods = useForm<ICard>({
    defaultValues: {
      wordList: [{ en: '', ru: '' } as IWordWithTranslate],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'wordList',
  })

  const watchedFields = methods.watch('wordList')

  const anchorRef = useRef<HTMLDivElement>(null)

  const createNewCard: SubmitHandler<ICard> = (card) => {
    card.id = `${new Date().getTime()}`
    card.author = 'spleekz'
    card.ui = {
      headColor: 'pink',
      wordListColor: 'aqua',
    }
    card.wordList.forEach((word) => {
      word.id = nanoid()
    })
    cardsStore.addCard(card)
  }

  useEffect(() => {
    anchorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [fields])

  return (
    <NewCardFormContainer color='pink'>
      <FormProvider {...methods}>
        <CardForm onSubmit={methods.handleSubmit(createNewCard)}>
          <NewCardHeading color='pink'>
            <CardNameInput
              {...methods.register(`name` as const, { required: true })}
              placeholder='Введите название карточки'
              maxLength={27}
            />
            <NewCardAuthor>spleekz</NewCardAuthor>
          </NewCardHeading>
          <NewCardWordsContainer color='aqua' isHover={false}>
            <NewCardWords>
              {fields.map((words, index) => {
                return (
                  <FormWordPair key={words.id} remove={remove} fields={watchedFields} index={index} />
                )
              })}
            </NewCardWords>
            <AddWordPairButtonContainer ref={anchorRef}>
              <AddWordPairButton type='button' onClick={() => append({ en: '', ru: '' })}>
                +
              </AddWordPairButton>
            </AddWordPairButtonContainer>
          </NewCardWordsContainer>
          <SubmitButton type='submit'>Создать карточку</SubmitButton>
        </CardForm>
      </FormProvider>
    </NewCardFormContainer>
  )
}
