import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Card, SendedCard, UpdatedCard } from '../../../api/api'
import { useStore } from '../../../stores/root-store/context'
import { CardAuthor, CardContainer, CardHeading, CardWords } from '../element/element'
import { useForm, FormProvider, useFieldArray, SubmitHandler } from 'react-hook-form'
import { FormWordPair } from './form-components/word-pair'
import { observer } from 'mobx-react-lite'
import { usePopupContext } from '../../../app'

interface ICardFormProps {
  card?: Card
}

export const CardForm: React.FC<ICardFormProps> = observer(({ card }) => {
  const { authStore, cardsStore } = useStore()
  const { cardDone } = usePopupContext()

  const isEditCard = card !== undefined

  const anchorRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const methods = useForm<SendedCard>({
    defaultValues: {
      name: isEditCard ? card.name : '',
      words: isEditCard ? card.words : [{ en: '', ru: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray<SendedCard, 'words', 'id'>({
    control: methods.control,
    name: 'words',
  })
  const watchedFields = methods.watch('words')

  const addNewWordPair = (): void => {
    append({ en: '', ru: '' })
    setTimeout(() => {
      anchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const createNewCard: SubmitHandler<SendedCard> = (card) => {
    card.ui = {
      headColor: 'pink',
      bodyColor: 'aqua',
    }
    cardsStore.addCard(card)
    cardDone.set(true)
  }

  const updateCard: SubmitHandler<SendedCard> = (updatableFields) => {
    const fullUpdatedCard: UpdatedCard = {
      ...updatableFields,
      ui: card!.ui,
      _id: card!._id,
    }

    cardsStore.updateCard(fullUpdatedCard)
    cardDone.set(true)
  }

  useLayoutEffect(() => {
    if (isEditCard) {
      anchorRef.current?.scrollIntoView()
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
    return () => cardDone.set(false)
  }, [])

  return (
    <CardFormContainer color='pink'>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(isEditCard ? updateCard : createNewCard)}>
          <FormCardHeading color='pink'>
            <CardNameInput
              {...methods.register(`name` as const, { required: true })}
              placeholder='Введите название карточки'
              maxLength={27}
            />
            <FormCardAuthor>{card?.author || authStore.me?.name}</FormCardAuthor>
          </FormCardHeading>
          <FormCardWordsContainer color='aqua' isHover={false}>
            <div
              ref={topRef}
              style={{
                height: '10px',
              }}
            />
            <FormCardWords>
              {fields.map((words, index) => {
                return (
                  <FormWordPair
                    key={words.id}
                    remove={remove}
                    fields={watchedFields}
                    isEditCard={isEditCard}
                    index={index}
                  />
                )
              })}
            </FormCardWords>
            <AddWordPairButtonContainer ref={anchorRef}>
              <AddWordPairButton type='button' onClick={addNewWordPair}>
                +
              </AddWordPairButton>
            </AddWordPairButtonContainer>
          </FormCardWordsContainer>
          <SubmitButton type='submit'>
            {isEditCard ? 'Обновить карточку' : 'Создать карточку'}
          </SubmitButton>
        </Form>
      </FormProvider>
    </CardFormContainer>
  )
})

const CardFormContainer = styled(CardContainer)`
  width: 500px;
  height: 780px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FormCardHeading = styled(CardHeading)`
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
const FormCardAuthor = styled(CardAuthor)``
const FormCardWordsContainer = styled(CardWords)`
  height: 650px;
  padding: 0px 15px 10px 15px;
  border-radius: 16px;
  overflow-y: auto;
`
const FormCardWords = styled.div``
const AddWordPairButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0 0 0;
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
