import { observer } from 'mobx-react-lite'
import React, { useLayoutEffect, useRef } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { SendedCard, UpdatedCard } from '../../../../api/api'
import { usePopupContext } from '../../../../app'
import { useStore } from '../../../../stores/root-store/context'
import { CardAuthorDiv, CardNameInput } from '../../styled-components'
import { CardTemplate } from '../../template'
import { CardVariantComponent, PropsForCardForm } from '../types'
import { FormCardBody } from './body/body'

export const FormCard: CardVariantComponent<PropsForCardForm> = observer(
  ({ card = null, width, height }) => {
    const { cardsStore, authStore } = useStore()

    const isEditCard = card !== null

    const { cardDone } = usePopupContext()
    const cardHeadColor = isEditCard ? card.ui.headColor : cardsStore.defaultCardUi.headColor
    const cardBodyColor = isEditCard ? card.ui.bodyColor : cardsStore.defaultCardUi.bodyColor

    const anchorRef = useRef<HTMLDivElement>(null)
    const topRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
      if (isEditCard) {
        anchorRef.current?.scrollIntoView()
        setTimeout(() => {
          topRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 310)
      }
      return () => cardDone.set(false)
    }, [])

    //!Все для формы
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

    //!Функции для сабмита
    const createNewCard: SubmitHandler<SendedCard> = (card) => {
      card.ui = {
        headColor: cardHeadColor,
        bodyColor: cardBodyColor,
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

    return (
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(isEditCard ? updateCard : createNewCard)}>
          <CardTemplate
            width={width}
            height={height}
            headColor={cardHeadColor}
            bodyColor={cardBodyColor}
          >
            <CardHeading>
              <CardName
                {...methods.register(`name` as const, { required: true })}
                placeholder='Введите название карточки'
                maxLength={27}
              />
              <CardAuthor>{isEditCard ? card.author.name : authStore.me?.name}</CardAuthor>
            </CardHeading>

            <FormCardBody
              fields={fields}
              headColor={cardHeadColor}
              bodyColor={cardBodyColor}
              remove={remove}
              addNewWordPair={addNewWordPair}
              watchedFields={watchedFields}
              topRef={topRef}
              anchorRef={anchorRef}
            />

            <SubmitButton color={cardHeadColor} type='submit'>
              {isEditCard ? 'Обновить карточку' : 'Создать карточку'}
            </SubmitButton>
          </CardTemplate>
        </Form>
      </FormProvider>
    )
  }
)

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const CardHeading = styled.div`
  padding: 10px 15px;
`
const CardName = styled(CardNameInput)`
  border: 0;
  outline: none;
  width: 100%;
  font-size: 32px;
  background-color: transparent;
`
const CardAuthor = styled(CardAuthorDiv)`
  font-size: 22px;
`
const SubmitButton = styled.button<{ color: string }>`
  font-weight: bold;
  width: 100%;
  font-size: 28px;
  padding: 4px;
  background-color: transparent;
`
