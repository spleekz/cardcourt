import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Card, SendedCard, UpdatedCard } from '../../../api/api'
import { useStore } from '../../../stores/root-store/context'
import { Author, Container, Heading, WordsContainer } from '../../card-slider/element/carcass'
import { useForm, FormProvider, useFieldArray, SubmitHandler } from 'react-hook-form'
import { FormWordPair } from './form-components/word-pair'
import { observer } from 'mobx-react-lite'
import { usePopupContext } from '../../../app'
import { getCardWidthByHeight } from '../../../lib/cards'

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

  const cardFormHeight = 780
  const cardFormWidth = getCardWidthByHeight(cardFormHeight)

  return (
    <FormContainer color={card?.ui.headColor || 'pink'} height={cardFormHeight} width={cardFormWidth}>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(isEditCard ? updateCard : createNewCard)}>
          <FormHeading color={card?.ui.headColor || 'pink'}>
            <NameInput
              {...methods.register(`name` as const, { required: true })}
              placeholder='Введите название карточки'
              maxLength={27}
            />
            <Author>{card?.author.name || authStore.me?.name}</Author>
          </FormHeading>
          <FormWordsContainer color={card?.ui.bodyColor || 'aqua'}>
            <div
              ref={topRef}
              style={{
                height: '10px',
              }}
            />
            {fields.map((words, index) => {
              return (
                <FormWordPair
                  key={words.id}
                  remove={remove}
                  fields={watchedFields}
                  isEditCard={isEditCard}
                  index={index}
                  color={card?.ui.bodyColor || 'aqua'}
                />
              )
            })}
            <AddWordPairButtonContainer ref={anchorRef}>
              <AddWordPairButton
                color={card?.ui.headColor || 'pink'}
                type='button'
                onClick={addNewWordPair}
              >
                +
              </AddWordPairButton>
            </AddWordPairButtonContainer>
          </FormWordsContainer>
          <SubmitButton color={card?.ui.headColor || 'pink'} type='submit'>
            {isEditCard ? 'Обновить карточку' : 'Создать карточку'}
          </SubmitButton>
        </Form>
      </FormProvider>
    </FormContainer>
  )
})

const FormContainer = styled(Container)``
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FormHeading = styled(Heading)`
  padding: 15px 15px 0 15px;
`
const NameInput = styled.input`
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
  font-weight: bold;
  font-size: 32px;
`
const FormWordsContainer = styled(WordsContainer)`
  height: 650px;
  padding: 0px 15px 10px 15px;
  border-radius: 16px;
  overflow-y: auto;
`
const AddWordPairButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0 0 0;
`
const AddWordPairButton = styled.button<{ color: string }>`
  width: 50%;
  background-color: ${(props) => props.color};
  font-size: 25px;
  font-weight: bold;
  border-radius: 5px;
`
const SubmitButton = styled.button<{ color: string }>`
  width: 100%;
  background-color: ${(props) => props.color};
  font-size: 28px;
  padding: 4px;
  font-weight: bold;
  position: relative;
  z-index: 1000;
`
