import { observer } from 'mobx-react-lite'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { SendedCard, UpdatedCard } from '../../../../api/api'
import { useStore } from '../../../../stores/root-store/context'
import { CardAuthorDiv, CardNameInput } from '../../card-shared-components/heading'
import { CardFooterButton } from '../../card-shared-components/footer'
import { CardTemplate } from '../../template'
import { CardVariantComponent, PropsForCardFormVariant } from '../types'
import { FormCardBody } from './body/body'
import cardConfig from '../../../../stores/card-config.json'
import { CardDonePopup } from '../../../popups/popup-with-custom-close/variants/card-done'
import { SameCardName } from '../../../messages/errors/same-card-name'

export const FormCard: CardVariantComponent<PropsForCardFormVariant> = observer(
  ({ cardStore = null, width, height }) => {
    const { cardsStore, authStore } = useStore()
    const card = cardStore?.card || null

    const isEditCard = card !== null

    //!CardDonePopup
    const [isCardDonePopupShown, setIsCardDonePopupShown] = useState(false)
    const [cardIdForRedirect, setCardIdForRedirect] = useState<string | null>(null)
    const showCardDonePopup = (cardId: string): void => {
      setIsCardDonePopupShown(true)
      setCardIdForRedirect(cardId)
    }
    const cardDonePopupTitle = isEditCard ? 'Карточка обновлена!' : 'Карточка создана'

    const cardBodyColor = isEditCard ? card.ui.bodyColor : cardConfig.bodyColor
    const cardWordsColor = isEditCard ? card.ui.wordsColor : cardConfig.wordsColor

    const anchorRef = useRef<HTMLDivElement>(null)
    const topRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
      if (isEditCard) {
        anchorRef.current?.scrollIntoView()
        setTimeout(() => {
          topRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 310)
      }
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

    const onCardNameInputBlur = (): void => {
      const { name } = methods.getValues()
      methods.setValue('name', name.trim())
    }

    //!Функции для сабмита
    const createNewCard: SubmitHandler<SendedCard> = (card) => {
      card.ui = {
        bodyColor: cardBodyColor,
        wordsColor: cardWordsColor,
      }
      cardsStore.createCard(card).then(({ _id }) => {
        showCardDonePopup(_id)
      })
    }

    const updateCard: SubmitHandler<SendedCard> = (updatableFields) => {
      const fullUpdatedCard: UpdatedCard = {
        ...card!,
        ...updatableFields,
      }
      cardStore!.updateCard(fullUpdatedCard).then(({ updatedCard }) => {
        showCardDonePopup(updatedCard._id)
      })
    }

    return (
      <>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(isEditCard ? updateCard : createNewCard)}>
            {cardsStore.cardCreatingLoadingState.sameCardName && (
              <ErrorBlock>
                <SameCardName />
              </ErrorBlock>
            )}

            <CardTemplate
              width={width}
              height={height}
              bodyColor={cardBodyColor}
              wordsColor={cardWordsColor}
            >
              <CardHeading>
                <CardName
                  {...methods.register(`name`, { required: true })}
                  placeholder='Введите название карточки'
                  maxLength={27}
                  onBlur={onCardNameInputBlur}
                />
                <CardAuthor>{isEditCard ? card.author.name : authStore.me?.name}</CardAuthor>
              </CardHeading>

              <FormCardBody
                fields={fields}
                bodyColor={cardBodyColor}
                remove={remove}
                addNewWordPair={addNewWordPair}
                watchedFields={watchedFields}
                topRef={topRef}
                anchorRef={anchorRef}
              />

              <SubmitButton type='submit'>
                {isEditCard ? 'Обновить карточку' : 'Создать карточку'}
              </SubmitButton>
            </CardTemplate>
          </Form>
        </FormProvider>

        <CardDonePopup
          isOpened={isCardDonePopupShown && Boolean(cardIdForRedirect)}
          fnForClosing={() => setIsCardDonePopupShown(false)}
          title={cardDonePopupTitle}
          cardId={cardIdForRedirect}
        />
      </>
    )
  }
)

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
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
const SubmitButton = styled(CardFooterButton)``
const ErrorBlock = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
`
